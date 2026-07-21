from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from tools.functions import generate_response
from tools.db_connection import init_db, close_db
 
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()
 
 
app = FastAPI(title="Lawyer Assist API", lifespan=lifespan)
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
 
@app.get("/")
def health_check():
    return {"status": "ok"}
 
 
@app.post("/api/query")
async def query(request: Request):
    body = await request.json()
    message = body.get("message", "")
    return await generate_response(message)