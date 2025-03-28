from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..database import Base

class Website(Base):
    __tablename__ = "websites"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    url = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    analytics_type = Column(String, nullable=False)  # "google_analytics", "custom", etc.
    analytics_properties = Column(JSON)  # Store API keys, property IDs, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="websites")
