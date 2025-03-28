from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict

from ..database import get_db
from ..models.user import User
from ..models.website import Website
from ..models.event import TrackingEvent
from ..auth.jwt import get_current_user
from sqlalchemy import func, distinct

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary")
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a summary of analytics across all user websites"""
    
    # Get all websites for the user
    websites = db.query(Website).filter(Website.user_id == current_user.id).all()
    
    if not websites:
        return {
            "total_websites": 0,
            "websites_data": []
        }
    
    websites_data = []
    
    for website in websites:
        if website.analytics_type == "custom":
            # For custom tracking, get data from our own tracking events
            total_visits = db.query(TrackingEvent).filter(
                TrackingEvent.site_id == str(website.id)
            ).count()
            
            unique_visitors = db.query(func.count(distinct(TrackingEvent.ip_address))).filter(
                TrackingEvent.site_id == str(website.id)
            ).scalar()
            
            # Get top pages
            top_pages = db.query(
                TrackingEvent.page, 
                func.count(TrackingEvent.id).label("count")
            ).filter(
                TrackingEvent.site_id == str(website.id)
            ).group_by(
                TrackingEvent.page
            ).order_by(
                func.count(TrackingEvent.id).desc()
            ).limit(5).all()
            
            website_data = {
                "id": website.id,
                "name": website.name,
                "url": website.url,
                "analytics_type": website.analytics_type,
                "total_visits": total_visits,
                "unique_visitors": unique_visitors,
                "top_pages": [{"page": page, "count": count} for page, count in top_pages]
            }
        else:
            # For external analytics services like Google Analytics
            # This would be implemented by fetching from their APIs
            website_data = {
                "id": website.id,
                "name": website.name,
                "url": website.url,
                "analytics_type": website.analytics_type,
                "message": "External analytics integration pending"
            }
        
        websites_data.append(website_data)
    
    return {
        "total_websites": len(websites),
        "websites_data": websites_data
    }
