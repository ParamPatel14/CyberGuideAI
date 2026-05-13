"""
CyberGuideAI - FastAPI Application Entry Point

AI-powered cybersecurity guidance and threat intelligence platform.
This module initializes the FastAPI application with CORS middleware
and mounts the API routers.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.router import router as api_v1_router

# ──────────────────────────────────────────────
# Application Instance
# ──────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# ──────────────────────────────────────────────
# Middleware
# ──────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# Routers
# ──────────────────────────────────────────────

app.include_router(api_v1_router, prefix=settings.API_V1_PREFIX)


# ──────────────────────────────────────────────
# Root Endpoint
# ──────────────────────────────────────────────

@app.get("/")
async def root():
    """Root endpoint — basic API info."""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/api/docs",
    }
