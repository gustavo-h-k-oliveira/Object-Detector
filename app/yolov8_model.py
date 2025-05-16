from ultralytics import YOLO
from PIL import Image
import io

# Carrega o modelo YOLOv8 pré-treinado com COCO
model = YOLO("yolov8n.pt")  # 'n' = nano (mais leve e rápido)

def detect_objects(image_bytes: bytes):
    # Abre a imagem a partir dos bytes recebidos
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Executa o modelo
    results = model(image)

    detections = []
    for box in results[0].boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        label = model.names[cls_id]
        bbox = box.xyxy[0].tolist()  # [x1, y1, x2, y2]

        detections.append({
            "class_id": cls_id,
            "label": label,
            "confidence": round(conf, 3),
            "bbox": [round(x, 2) for x in bbox]
        })

    return detections
