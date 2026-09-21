from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    migration_database_url: str | None = None
    app_env: str = "development"
    session_cookie_name: str = "empresti_session"
    session_ttl_seconds: int = 86_400
    session_cookie_secure: bool = False
    session_secret: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @field_validator("database_url", "migration_database_url", mode="before")
    @classmethod
    def select_psycopg_driver(cls, value: str | None) -> str | None:
        if value is None:
            return None
        if value.startswith("postgres://"):
            return value.replace("postgres://", "postgresql+psycopg://", 1)
        if value.startswith("postgresql://"):
            return value.replace("postgresql://", "postgresql+psycopg://", 1)
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
