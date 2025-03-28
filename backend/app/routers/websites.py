from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models.website import Website
from ..schemas.website import WebsiteCreate, Website as WebsiteSchema, WebsiteUpdate
from ..auth.jwt import get_current_user
from ..models.user import User

router = APIRouter(prefix="/websites", tags=["websites"])

@router.post("/", response_model=WebsiteSchema)
def create_website(
    website: WebsiteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_website = Website(
        name=website.name,
        url=str(website.url),
        analytics_type=website.analytics_type,
        analytics_properties=website.analytics_properties,
        user_id=current_user.id
    )
    
    db.add(db_website)
    db.commit()
    db.refresh(db_website)
    
    return db_website

@router.get("/", response_model=List[WebsiteSchema])
def get_websites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    websites = db.query(Website).filter(Website.user_id == current_user.id).all()
    return websites

@router.get("/{website_id}", response_model=WebsiteSchema)
def get_website(
    website_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    website = db.query(Website).filter(
        Website.id == website_id,
        Website.user_id == current_user.id
    ).first()
    
    if not website:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Website not found"
        )
    
    return website

@router.put("/{website_id}", response_model=WebsiteSchema)
def update_website(
    website_id: int,
    website_update: WebsiteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_website = db.query(Website).filter(
        Website.id == website_id,
        Website.user_id == current_user.id
    ).first()
    
    if not db_website:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Website not found"
        )
    
    update_data = website_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_website, key, value)
    
    db.commit()
    db.refresh(db_website)
    
    return db_website

@router.delete("/{website_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_website(
    website_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_website = db.query(Website).filter(
        Website.id == website_id,
        Website.user_id == current_user.id
    ).first()
    
    if not db_website:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Website not found"
        )
    
    db.delete(db_website)
    db.commit()
    
    return None
