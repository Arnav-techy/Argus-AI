# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.scan import router as scan_router
import uvicorn

app = FastAPI(
    title="AI Security Copilot API",
    description="AI-powered security analysis and vulnerability detection",
    version="1.0.0"
)

# Configure CORS for Next.js frontend
# Find this section (around line 15-25):
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this line
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# aiSecurityCopilot-master/backend/main.py

# Look for CORS configuration (likely around line 20-30)
# Update it to include port 8080:

from fastapi.middleware.cors import CORSMiddleware

# Add this after creating the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],  # Add OPTIONS
    allow_headers=["*"],  # Or specify: ["Content-Type", "Authorization", "Accept"]
    expose_headers=["*"],
    max_age=600,  # Cache preflight for 10 minutes
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
    print("🚀 Starting Argus AI Backend...")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔗 Frontend: http://localhost:8080")
    uvicorn.run(app, host="0.0.0.0", port=8000)
