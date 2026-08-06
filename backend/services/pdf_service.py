import fitz  # PyMuPDF

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts text from a given PDF file using PyMuPDF.
    """
    text = ""
    try:
        doc = fitz.open(file_path)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text("text") + "\n\n"
        doc.close()
    except Exception as e:
        print(f"Error extracting PDF: {e}")
    return text.strip()

def extract_text_from_bytes(file_bytes: bytes) -> str:
    """
    Extracts text directly from bytes (useful for FastAPI upload).
    """
    text = ""
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text("text") + "\n\n"
        doc.close()
    except Exception as e:
        print(f"Error extracting PDF bytes: {e}")
    return text.strip()
