import os
import json
import google.generativeai as genai

# Setup API Key securely
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "mock-key"))

def generate_learning_content(extracted_text: str):
    """
    Sends the extracted PDF text to Gemini to return a structured JSON array of learning reels.
    """
    prompt = f"""
    You are an expert AI tutor. I will provide you with extracted text from a student's study material (PDF/PPT).
    Analyze the text and break it down into 5 to 7 short, engaging "Learning Reels" (like educational flashcards or TikToks).

    You MUST output valid JSON only. The JSON should be an array of objects.
    Each object must have the following keys:
    - "title": (string) topic title
    - "explanation": (string) short explanation (2-3 sentences max)
    - "key_points": (array of strings) 3-5 bullet points
    - "image_prompt": (string) a prompt to generate an image for this concept
    - "voice_text": (string) what the AI voice will say
    
    Here is the study material text:
    =============
    {extracted_text}
    =============
    
    Generate JSON:
    """
    
    try:
        # If no real API key, return mock valid JSON for testing frontend
        if os.environ.get("GEMINI_API_KEY") in [None, "mock-key", ""]:
            return get_mock_reels()

        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        # basic cleanup in case gemini wraps with ```json
        content = response.text.replace("```json", "").replace("```", "").strip()
        data = json.loads(content)
        return data
    except Exception as e:
        print(f"Error generating AI content: {e}")
        return get_mock_reels()

def generate_quiz_from_text(extracted_text: str):
    """
    Generate multiple choice questions based on the text.
    """
    try:
        if os.environ.get("GEMINI_API_KEY") in [None, "mock-key", ""]:
            return get_mock_quiz()
            
        prompt = f"Generate 3 multiple choice questions from this text. Output an array of JSON objects with keys: 'question', 'options' (array of 4 strings), 'correct_answer' (string matching one option), 'explanation'. Text: {extracted_text}"
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return json.loads(response.text.replace("```json", "").replace("```", "").strip())
    except:
        return get_mock_quiz()

def get_mock_reels():
    return [
       {
           "title": "What is Deadlock?",
           "explanation": "Deadlock occurs when processes wait indefinitely for resources held by each other.",
           "key_points": ["Waiting Processes", "Locked Resources", "No Forward Progress"],
           "image_prompt": "Traffic jam at a four-way intersection.",
           "voice_text": "A deadlock happens when two or more processes are stuck waiting for each other to release resources, leading to a standstill."
       },
       {
           "title": "Mutual Exclusion",
           "explanation": "At least one resource must be held in a non-sharable mode.",
           "key_points": ["Only one process at a time", "Resource is locked", "Others must wait"],
           "image_prompt": "A single key to a locked door.",
           "voice_text": "Mutual Exclusion means only one process can use a resource at any given time. If another process wants it, it has to wait."
       }
    ]

def get_mock_quiz():
    return [
        {
            "question": "Which of the following is a condition of deadlock?",
            "options": ["CPU Scheduling", "Circular Wait", "File Compression", "Paging"],
            "correct_answer": "Circular Wait",
            "explanation": "Circular wait is one of the 4 necessary conditions for deadlock."
        }
    ]
