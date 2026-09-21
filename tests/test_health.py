from fastapi.testclient import TestClient

from app.database import DatabaseStatus
from app.config import Settings
from app.main import app


client = TestClient(app)


def test_health_returns_ok_when_database_is_available(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.main.check_database",
        lambda: DatabaseStatus(True, "conexão disponível"),
    )

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "database": "conexão disponível",
    }


def test_health_returns_503_when_database_is_unavailable(monkeypatch) -> None:
    monkeypatch.setattr(
        "app.main.check_database",
        lambda: DatabaseStatus(False, "não foi possível conectar ao banco"),
    )

    response = client.get("/health")

    assert response.status_code == 503
    assert response.json()["status"] == "unavailable"


def test_root_serves_zero_floor_page() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert "Andar zero" in response.text


def test_supabase_postgresql_url_uses_psycopg_driver() -> None:
    settings = Settings(
        database_url="postgresql://user:password@example.com/database",
        session_secret="test-only-secret",
    )

    assert settings.database_url.startswith("postgresql+psycopg://")
