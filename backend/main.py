# backend/main.py
# pyrefly: ignore [missing-import]
import sys
import os

# Add the current directory (backend/) to python path to resolve local imports correctly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.scan import router as scan_router
import uvicorn

app = FastAPI(
    title="AI Security Copilot API",
    description="AI-powered security analysis and vulnerability detection",
    version="1.0.0"
)

# Configure CORS
import os

allowed_origins_env = os.getenv("ALLOWED_ORIGINS")

if allowed_origins_env:
    origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    # Fallback to allow all for easy deployment and local development
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers
app.include_router(scan_router)

@app.get("/")
async def root():
    return {
        "message": "AI Security Copilot API",
        "docs": "/docs",
        "endpoints": {
            "analyze": "/scan/analyze",
            "analyze-code": "/scan/analyze-code",
            "history": "/scan/history",
            "health": "/scan/health"
        }
    }

if __name__ == "__main__":
    print("Starting Argus AI Backend...")
    print("API Documentation: http://localhost:8000/docs")
    print("Frontend: http://localhost:8080")
    uvicorn.run(app, host="0.0.0.0", port=8000)
