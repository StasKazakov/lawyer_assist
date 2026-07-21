from tools.clients import openrouter_client
from config import EMBEDDING_MODEL, VECTOR_COLUMN
from tools.db_connection import get_pool

# Get top documents from db
async def get_top_documents(question_embedding: str, vector_column: str, limit: int = 10) -> list:
    pool = get_pool()
    raw_limit = limit * 3
    search_query = f"""
        SELECT doc_id 
        FROM chunks_512
        ORDER BY {vector_column} <=> $1::vector 
        LIMIT {raw_limit};
    """
    
    async with pool.acquire() as connection:
        rows = await connection.fetch(search_query, question_embedding)
        
        seen_docs = set()
        unique_doc_ids = []
        
        for row in rows:
            doc_id = int(row['doc_id'])
            if doc_id not in seen_docs:
                seen_docs.add(doc_id)
                unique_doc_ids.append(doc_id)
                
            if len(unique_doc_ids) == limit:
                break
                
        return unique_doc_ids

# Create embeddings with Qwen
async def get_qwen_embedding(text: str) -> str:
    """Fetches a 4096-dimension embedding vector from OpenRouter for the given text."""
    response = await openrouter_client.embeddings.create(
        input=[text],
        model=EMBEDDING_MODEL,
    )
    return str(response.data[0].embedding)
# Get metadata about documents
async def get_data_from_id(list_documents: list) -> list:
    doc_data = []
    pool = get_pool()
    query = """
        SELECT doc_id, cause_num, doc_url
        FROM doc_sample_1k
        WHERE doc_id = $1
        LIMIT 1;
    """
    async with pool.acquire() as connection:
        for doc_id in list_documents:
            row = await connection.fetchrow(query, str(doc_id))
            if row is not None:
                doc_data.append(dict(row))
    return doc_data


# Mein function for generating response
async def generate_response(request: str):
     embedding = await get_qwen_embedding(request)
     top_docs = await get_top_documents(embedding, VECTOR_COLUMN)
     data = await get_data_from_id(top_docs)
     print(data)
     
     return data