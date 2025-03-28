from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import timedelta
import secrets
import httpx

from ..database import get_db
from ..models.user import User
from ..schemas.user import UserCreate, User as UserSchema
from ..schemas.token import Token
from ..auth.jwt import create_access_token, get_current_user
from ..config import settings
from ..auth.oauth import get_github_user_data, get_google_user_data, get_or_create_user

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.hashed_password:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

@router.post("/register", response_model=UserSchema)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# GitHub OAuth routes
@router.get("/github/login")
async def github_login():
    """Generate GitHub OAuth login URL"""
    state = secrets.token_urlsafe(16)
    github_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_REDIRECT_URI}"
        f"&state={state}"
        f"&scope=user:email"
    )
    return {"authorization_url": github_url, "state": state}

@router.get("/github/callback")
async def github_callback(
    code: str, 
    state: str, 
    db: Session = Depends(get_db)
):
    """Handle GitHub OAuth callback"""
    async with httpx.AsyncClient() as client:
        # Exchange code for access token
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": settings.GITHUB_REDIRECT_URI,
                "state": state
            },
            headers={"Accept": "application/json"}
        )
        token_data = token_response.json()
        
        if "error" in token_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"GitHub OAuth error: {token_data['error_description']}"
            )
        
        # Get GitHub user data
        access_token = token_data["access_token"]
        user_data = await get_github_user_data(access_token)
        
        if not user_data.get("email"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unable to fetch email from GitHub"
            )
        
        # Get or create user
        user = get_or_create_user(
            db=db,
            email=user_data["email"],
            name=user_data.get("name"),
            provider="github",
            provider_id=str(user_data["id"])
        )
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email},
            expires_delta=access_token_expires
        )
        
        # Redirect to frontend with token
        frontend_url = f"{settings.FRONTEND_URL}/oauth-callback?token={access_token}"
        return RedirectResponse(url=frontend_url)

# Google OAuth routes
@router.get("/google/login")
async def google_login():
    """Generate Google OAuth login URL"""
    state = secrets.token_urlsafe(16)
    google_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
        f"&response_type=code"
        f"&state={state}"
        f"&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        f"&access_type=offline"
    )
    return {"authorization_url": google_url, "state": state}

@router.get("/google/callback")
async def google_callback(
    code: str, 
    state: str, 
    db: Session = Depends(get_db)
):
    """Handle Google OAuth callback"""
    async with httpx.AsyncClient() as client:
        # Exchange code for access token
        token_response = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": settings.GOOGLE_REDIRECT_URI
            }
        )
        token_data = token_response.json()
        
        if "error" in token_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Google OAuth error: {token_data.get('error_description', token_data['error'])}"
            )
        
        # Get Google user data
        access_token = token_data["access_token"]
        user_data = await get_google_user_data(access_token)
        
        # Get or create user
        user = get_or_create_user(
            db=db,
            email=user_data["email"],
            name=user_data.get("name"),
            provider="google",
            provider_id=user_data["id"]
        )
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email},
            expires_delta=access_token_expires
        )
        
        # Redirect to frontend with token
        frontend_url = f"{settings.FRONTEND_URL}/oauth-callback?token={access_token}"
        return RedirectResponse(url=frontend_url)

@router.get("/me", response_model=UserSchema)
def get_user_me(current_user: User = Depends(get_current_user)):
    return current_user
