import os
import google.generativeai as genai

def setup_gemini_api():
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    return genai.GenerativeModel("gemini-pro")
