from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from ..database import Base


class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(Integer, nullable=False)
    page = Column(String)
    ip_address = Column(String)
    user_agent = Column(String)
    referer = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
