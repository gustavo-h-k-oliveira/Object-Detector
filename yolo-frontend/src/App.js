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
      const res = await fetch("https://8000-gustavohkol-objectdetec-trgpe5t3imf.ws-us118.gitpod.io/detect/image", {
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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Detector de Objetos com YOLOv8</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {loading && <p className="text-yellow-400">Detectando objetos...</p>}

      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm mb-1">Imagem original:</p>
          <img src={imagePreview} alt="Preview" className="max-w-md rounded" />
        </div>
      )}

      {base64Result && (
        <div>
          <p className="text-sm mb-1">Imagem com objetos detectados:</p>
          <img src={base64Result} alt="Detecção YOLO" className="max-w-md rounded border border-green-500" />
        </div>
      )}
    </div>
  );
}

export default App;
