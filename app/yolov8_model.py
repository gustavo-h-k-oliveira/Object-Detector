from ultralytics import YOLO
from PIL import Image
import io
import base64

model = YOLO("yolov8n.pt")

def detect_objects(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    results = model(image)

    detections = []
    for box in results[0].boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        label = model.names[cls_id]
        bbox = box.xyxy[0].tolist()

        detections.append({
            "class_id": cls_id,
            "label": label,
            "confidence": round(conf, 3),
            "bbox": [round(x, 2) for x in bbox]
        })

    return detections

def detect_and_render(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    results = model(image)

    # Renderiza imagem com bounding boxes
    rendered = results[0].plot()  # numpy array com as caixas desenhadas

    # Converte para JPEG em memória
    image_pil = Image.fromarray(rendered)
    buf = io.BytesIO()
    image_pil.save(buf, format="JPEG")
    byte_im = buf.getvalue()

    # Codifica em base64 para retornar como texto
    base64_image = base64.b64encode(byte_im).decode("utf-8")

    return base64_image
