from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.yolov8_model import detect_objects, detect_and_render

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API YOLOv8 ativa!"}

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    image_bytes = await file.read()
    results = detect_objects(image_bytes)
    return {"results": results}

@app.post("/detect/image")
async def detect_with_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    base64_img = detect_and_render(image_bytes)
    return JSONResponse(content={"image_base64": base64_img})
