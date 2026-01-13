from fastapi import APIRouter
from backend.services.gemini import analyze_security_issue


router = APIRouter()

@router.post("/scan")
def scan():
    issue = "Hardcoded API key found in source code"
    ai_result = analyze_security_issue(issue)

    return {
        "issue": issue,
        "ai_analysis": ai_result
    }
