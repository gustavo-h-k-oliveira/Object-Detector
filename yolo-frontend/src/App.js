import "./App.css";
import { useState } from "react";

function App() {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Result, setBase64Result] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = async (event) => {
    setError(null);
    setSuccess(false);
    const file = event.target.files[0];
    if (!file) return;

    // Validação do tipo de arquivo
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Por favor, envie uma imagem JPEG ou PNG.");
      return;
    }

    // Validação do tamanho do arquivo (ex: 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("O tamanho máximo permitido é 5MB.");
      return;
    }

    // Previsão local para visualização antes da requisição
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("https://expert-space-halibut-w6j697rxppg3g74r-8000.app.github.dev/detect/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setBase64Result(`data:image/jpeg;base64,${data.image_base64}`);
      setSuccess(true);
    } catch (err) {
      setError("Erro ao enviar imagem.");
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

      {error && <p style={{ color: "#f87171", marginBottom: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "#22c55e", marginBottom: "1rem" }}>Objetos detectados com sucesso!</p>}

      {loading && (
        <div>
          <div className="spinner"></div>
          <p className="text-processing">Detectando objetos...</p>
        </div>
      )}

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
