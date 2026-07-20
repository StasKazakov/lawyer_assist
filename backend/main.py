from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Lawyer Assist API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    message: str


class QueryResponse(BaseModel):
    response: str


STUB_RESPONSE = (
    "Це тестова відповідь від системи. Наш бекенд опрацював ваш запит "
    "та підготував правовий аналіз на основі чинного законодавства "
    "та релевантної судової практики."
)


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/api/query", response_model=QueryResponse)
def query(request: QueryRequest):
    return QueryResponse(response=STUB_RESPONSE)