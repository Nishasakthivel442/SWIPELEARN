from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.pdf_service import extract_text_from_bytes
from services.ai_service import generate_learning_content, generate_quiz_from_text, get_mock_reels

app = FastAPI(title="SwipeLearn API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContentRequest(BaseModel):
    document_id: str

@app.get("/")
def read_root():
    return {"message": "SwipeLearn API is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Simulating upload ID
    return {"filename": file.filename, "document_id": "doc_123", "status": "Uploaded successfully"}

@app.post("/generate-content")
async def generate_content(req: ContentRequest):
    # Retrieve AI content (MOCKED directly for frontend build testing)
    reels = get_mock_reels()
    return {"status": "success", "reels": reels}

@app.post("/generate-quiz")
async def generate_quiz(req: ContentRequest):
    # Generate Quiz (Mocked)
    from services.ai_service import get_mock_quiz
    return {"status": "success", "quiz": get_mock_quiz()}

@app.post("/generate-audio")
async def generate_audio(req: ContentRequest):
    return {"status": "success", "audio_url": "mock_audio.mp3"}

@app.get("/learning-content")
async def get_learning_content(document_id: str):
    return {"document_id": document_id, "reels": get_mock_reels()}

@app.post("/quiz-result")
async def post_quiz_result(req: dict):
    return {"status": "Result saved"}

