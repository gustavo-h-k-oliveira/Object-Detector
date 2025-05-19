from fastapi import FastAPI, UploadFile, File, HTTPException
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

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"]

@app.get("/")
def home():
    return {"message": "API YOLOv8 ativa!"}

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    # Validação do tipo de arquivo
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Tipo de arquivo não suportado. Envie uma imagem JPEG ou PNG.")

    # Validação do tamanho do arquivo
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="O tamanho máximo permitido é 5MB.")

    results = detect_objects(contents)
    return {"results": results}

@app.post("/detect/image")
async def detect_with_image(file: UploadFile = File(...)):
    # Validação do tipo de arquivo
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Tipo de arquivo não suportado. Envie uma imagem JPEG ou PNG.")

    # Validação do tamanho do arquivo
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="O tamanho máximo permitido é 5MB.")

    base64_img = detect_and_render(contents)
    return JSONResponse(content={"image_base64": base64_img})
