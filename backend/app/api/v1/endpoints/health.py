"""
Health Check Endpoint

Provides a simple health check to verify the API is running
and to confirm frontend ↔ backend connectivity.
"""

from datetime import datetime, timezone
from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """
    Health check endpoint.

    Returns the current status of the API along with
    application metadata and server timestamp.
    """
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "description": settings.APP_DESCRIPTION,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
