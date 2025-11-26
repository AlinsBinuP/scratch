from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import io
from PIL import Image
from ml_service import get_captioner, get_styler

app = FastAPI(title="Image Caption Generator")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CaptionResponse(BaseModel):
    captions: List[str]
    hashtags: List[str]

@app.on_event("startup")
async def startup_event():
    # Preload models
    get_captioner()
    get_styler()

@app.post("/api/generate_caption", response_model=CaptionResponse)
async def generate_caption(
    file: UploadFile = File(...),
    style: str = Form(...)
):
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # 1. Generate Base Caption
        captioner = get_captioner()
        base_caption = captioner.generate_caption(image)
        print(f"Base Caption: {base_caption}")

        # 2. Style Caption and Generate Hashtags
        styler = get_styler()
        captions = styler.style_caption(base_caption, style)
        hashtags = styler.generate_hashtags(base_caption)

        return CaptionResponse(captions=captions, hashtags=hashtags)

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
