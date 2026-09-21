import os


os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+psycopg://postgres:postgres@localhost:5432/empresti_test",
)
os.environ.setdefault("SESSION_SECRET", "test-only-secret")

