from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any
from datetime import datetime

class WebsiteBase(BaseModel):
    name: str
    url: HttpUrl
    analytics_type: str

class WebsiteCreate(WebsiteBase):
    analytics_properties: Optional[Dict[str, Any]] = None

class WebsiteUpdate(BaseModel):
    name: Optional[str] = None
    url: Optional[HttpUrl] = None
    analytics_type: Optional[str] = None
    analytics_properties: Optional[Dict[str, Any]] = None

class Website(WebsiteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True  # Updated from orm_mode=True
