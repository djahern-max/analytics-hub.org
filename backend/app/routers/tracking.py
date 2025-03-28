from fastapi import APIRouter, Request, Response, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.event import TrackingEvent

router = APIRouter(prefix="/tracking", tags=["tracking"])

@router.get("/pixel.gif")
async def tracking_pixel(
    request: Request, 
    site_id: str, 
    page: str = None,
    db: Session = Depends(get_db)
):
    """Simple tracking pixel endpoint"""
    # Extract user information
    ip = request.client.host
    user_agent = request.headers.get("user-agent", "")
    referer = request.headers.get("referer", "")
    
    # Create tracking event
    new_event = TrackingEvent(
        site_id=site_id,
        page=page,
        ip_address=ip,
        user_agent=user_agent,
        referer=referer
    )
    
    db.add(new_event)
    db.commit()
    
    # Return a 1x1 transparent GIF
    return Response(
        content=b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00\x21\xf9\x04\x01\x00\x00\x00\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02\x44\x01\x00\x3b',
        media_type="image/gif"
    )

@router.get("/snippet/{site_id}")
def get_tracking_snippet(site_id: str):
    """Generate a tracking script snippet for a website"""
    tracking_script = f"""
<!-- Analytics Hub Tracking Code -->
<script>
  (function() {{
    var d = document, g = d.createElement('img'), s = d.getElementsByTagName('script')[0];
    g.src = 'http://localhost:8000/api/tracking/pixel.gif?site_id={site_id}&page=' + encodeURIComponent(window.location.pathname);
    g.style.position = 'absolute';
    g.style.width = '1px';
    g.style.height = '1px';
    g.style.top = '-1px';
    g.style.left = '-1px';
    s.parentNode.insertBefore(g, s);
  }})();
</script>
"""
    return {"snippet": tracking_script}
