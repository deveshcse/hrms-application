from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent  # -> server folder

class Settings(BaseSettings):
    database_url: str
    app_name: str

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env"
    )

settings = Settings()