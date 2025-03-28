from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from sqlalchemy.orm import Session
import httpx
from typing import Optional, Dict, Any
import json

from ..config import settings
from ..database import get_db
from ..models.user import User

# OAuth2 configuration for GitHub
github_oauth = OAuth2AuthorizationCodeBearer(
    authorizationUrl="https://github.com/login/oauth/authorize",
    tokenUrl="https://github.com/login/oauth/access_token",
    scopes={"user:email": "Read user email addresses"}
)

# OAuth2 configuration for Google
google_oauth = OAuth2AuthorizationCodeBearer(
    authorizationUrl="https://accounts.google.com/o/oauth2/auth",
    tokenUrl="https://oauth2.googleapis.com/token",
    scopes={
        "https://www.googleapis.com/auth/userinfo.email": "View your email address",
        "https://www.googleapis.com/auth/userinfo.profile": "View your basic profile info"
    }
)

async def get_github_user_data(token: str) -> Dict[str, Any]:
    """Get user data from GitHub API"""
    async with httpx.AsyncClient() as client:
        headers = {"Authorization": f"Bearer {token}"}
        
        # Get user profile
        response = await client.get("https://api.github.com/user", headers=headers)
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate GitHub credentials"
            )
        
        user_data = response.json()
        
        # If email is private, get email through the emails endpoint
        if not user_data.get("email"):
            emails_response = await client.get("https://api.github.com/user/emails", headers=headers)
            if emails_response.status_code == 200:
                emails = emails_response.json()
                primary_email = next((email for email in emails if email.get("primary")), None)
                if primary_email:
                    user_data["email"] = primary_email.get("email")
        
        return user_data

async def get_google_user_data(token: str) -> Dict[str, Any]:
    """Get user data from Google API"""
    async with httpx.AsyncClient() as client:
        headers = {"Authorization": f"Bearer {token}"}
        
        # Get user profile
        response = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers=headers
        )
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate Google credentials"
            )
        
        return response.json()

def get_or_create_user(
    db: Session,
    email: str,
    name: Optional[str] = None,
    provider: str = "oauth",
    provider_id: Optional[str] = None
) -> User:
    """Get existing user or create a new one"""
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # Create a new user
        user = User(
            email=email,
            full_name=name,
            hashed_password="", # No password for OAuth users
            is_active=True,
            oauth_provider=provider,
            oauth_provider_id=provider_id
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user
