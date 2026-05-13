"""
API v1 Router

Aggregates all v1 endpoint routers into a single router
that gets mounted on the main application.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import health

router = APIRouter()

# Include all endpoint routers
router.include_router(health.router)
