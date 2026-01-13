import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3-flash-preview")

def analyze_security_issue(issue: str) -> str:
    prompt = f"""
    You are an AI Security Copilot.

    Analyze this security issue:
    {issue}

    Provide:
    1. Risk explanation
    2. Attack scenario
    3. Secure fix
    """

    response = model.generate_content(prompt)
    return response.text
