from pathlib import Path

from fastapi import FastAPI, Response, status
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.database import check_database


BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(
    title="Empréstimo de Equipamentos Internos",
    version="0.1.0",
)


@app.get("/health", tags=["infraestrutura"])
def health(response: Response) -> dict[str, str]:
    database = check_database()
    if not database.available:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {"status": "unavailable", "database": database.message}
    return {"status": "ok", "database": database.message}


@app.get("/", include_in_schema=False, response_class=FileResponse)
def index() -> FileResponse:
    return FileResponse(BASE_DIR / "static" / "index.html")


app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

