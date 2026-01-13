from fastapi import FastAPI
from backend.routes.scan import router as scan_router


app = FastAPI()

app.include_router(scan_router, prefix="/api")
