import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_NAME: str = "SigmaLearn Math API"
    API_VERSION: str = "1.0.0"
    CORS_ORIGINS: str = "*"
    ENABLE_OCR: bool = False
    OCR_ENGINE: str = "tesseract"
    ENABLE_JAVA: bool = False
    JAVA_CLASSPATH: str = "server/bridge/java_modules"
    JAVA_HEAP: str = "-Xmx256m"
    MAX_STEPS: int = 200
    MAX_INPUT_SIZE: int = 8000

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
