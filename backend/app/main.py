from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, websites, tracking, dashboard
from .config import settings
from .database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth, prefix=settings.API_V1_STR, tags=["authentication"])
app.include_router(websites, prefix=settings.API_V1_STR, tags=["websites"])
app.include_router(tracking, prefix=settings.API_V1_STR, tags=["tracking"])
app.include_router(dashboard, prefix=settings.API_V1_STR, tags=["dashboard"])

@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}
