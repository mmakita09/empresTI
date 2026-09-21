from dataclasses import dataclass

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from app.config import get_settings


@dataclass(frozen=True)
class DatabaseStatus:
    available: bool
    message: str


settings = get_settings()

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    pool_size=1,
    max_overflow=0,
    connect_args={"prepare_threshold": None},
)


def check_database() -> DatabaseStatus:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return DatabaseStatus(available=True, message="conexão disponível")
    except SQLAlchemyError:
        return DatabaseStatus(available=False, message="não foi possível conectar ao banco")

