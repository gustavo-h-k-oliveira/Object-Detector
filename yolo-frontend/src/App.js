import "./App.css";
import { useState } from "react";

function App() {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Result, setBase64Result] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Previsão local para visualização antes da requisição
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("https://expert-space-halibut-w6j697rxppg3g74r-8000.app.github.dev/detect/image", { // URL do seu backend
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setBase64Result(`data:image/jpeg;base64,${data.image_base64}`);
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-bg">
      <h1 className="title">Detector de Objetos com YOLOv8</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="input-file"
      />

      {loading && <p className="text-yellow">Detectando objetos...</p>}

      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm mb-1">Imagem original:</p>
          <img src={imagePreview} alt="Preview" className="img-preview" />
        </div>
      )}

      {base64Result && (
        <div>
          <p className="text-sm mb-1">Imagem com objetos detectados:</p>
          <img src={base64Result} alt="Detecção YOLO" className="img-result" />
        </div>
      )}
    </div>
  );
}

export default App;
