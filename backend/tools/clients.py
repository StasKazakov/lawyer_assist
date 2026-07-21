import os
from openai import AsyncOpenAI
from dotenv import load_dotenv
load_dotenv()


# OpenRouter client
openrouter_client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
    default_headers={
        "HTTP-Referer": "https://github.com/your-username/law-rag", 
        "X-Title": "Law RAG System",
    }
)