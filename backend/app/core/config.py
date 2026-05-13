"""
CyberGuideAI - Application Configuration

Centralized configuration management using environment variables
with sensible defaults for development.
"""

import os
from dotenv import load_dotenv

# Load .env file if it exists
load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""

    # Application
    APP_NAME: str = os.getenv("APP_NAME", "CyberGuideAI")
    APP_VERSION: str = os.getenv("APP_VERSION", "0.1.0")
    APP_DESCRIPTION: str = os.getenv(
        "APP_DESCRIPTION",
        "AI-powered cybersecurity guidance and threat intelligence platform"
    )
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"

    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # CORS
    CORS_ORIGINS: list[str] = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://localhost:3000"
    ).split(",")

    # API
    API_V1_PREFIX: str = "/api/v1"


# Singleton settings instance
settings = Settings()
