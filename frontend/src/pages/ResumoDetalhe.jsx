import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../assets/css/mapa.css";

const SUPPORTED_PREVIEW = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp"];

function canPreview(resumo) {
  if (!resumo) return false;
  const type = resumo.contentType || resumo.tipo || resumo.mimetype || "";
  return type.startsWith("image/") || type === "application/pdf" ||
    SUPPORTED_PREVIEW.some((ext) =>
      (resumo.previewUrl || resumo.nomeFicheiro || resumo.filename || "")
        .toLowerCase()
        .endsWith(ext)
    );
}

function ResumoDetalhe() {
  const { id } = useParams();
  const location = useLocation();
  const [resumo, setResumo] = useState(location.state?.resumo || null);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!resumo) {
      fetch(`/api/files?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          const ficheiro = Array.isArray(data)
            ? data[0]
            : data.files?.[0] || data;
          setResumo(ficheiro);
        })
        .catch((err) => console.error("Erro ao buscar resumo:", err));
    }
  }, [id, resumo]);

  const handleRating = (newRating) => {
    const token = localStorage.getItem("token");
    fetch(`/api/uploads/${id}/classificar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nota: newRating }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensagem);
        setResumo((prev) => ({
          ...prev,
          rating: data.rating,
          ratingCount: data.ratingCount,
        }));
      })
      .catch(() => {
        alert("Não foi possível classificar. Verifica se estás autenticado ou se estás a tentar classificar o teu próprio ficheiro.");
      });
  };

  if (!resumo) return <p>A carregar resumo...</p>;

  const resumoId = resumo._id || resumo.id;

  return (
    <div className="pagina-mapa">
      <div className="mapa-header">
        <div className="upload-resumo-header">
          <h2>{resumo.titulo || "Sem título"}</h2>
          <hr className="divider" />
        </div>
      </div>

      <div className="mapa-wrapper" style={{ flexDirection: "column" }}>
        <div className="form-section">
          <p><strong>Upload por:</strong> {resumo.ownerEmail || resumo.author || resumo.email || "Desconhecido"}</p>
          <p><strong>Descrição:</strong> {resumo.descricao || "Sem descrição."}</p>
          <p><strong>UC:</strong> {resumo.uc || "Não especificada"}</p>
          <p><strong>Curso:</strong> {resumo.curso || "Não especificado"}</p>
          <p><strong>Ano:</strong> {resumo.ano || "Não especificado"}</p>
          <p><strong>Data de upload:</strong> {resumo.createdAt || resumo.uploadedAt ? new Date(resumo.createdAt || resumo.uploadedAt).toLocaleDateString() : "Desconhecida"}</p>
          <p><strong>Tamanho do ficheiro:</strong> {resumo.size ? (resumo.size / 1024).toFixed(2) + " KB" : "Desconhecido"}</p>
          <p><strong>Tipo de ficheiro:</strong> {resumo.contentType || resumo.tipo || resumo.mimetype || "Desconhecido"}</p>
          <p><strong>Nome do ficheiro:</strong> {resumo.nomeFicheiro || resumo.filename || "Desconhecido"}</p>

          <div className="rating-section" style={{ marginTop: "20px" }}>
            <strong>Avaliação:</strong>
            <ReactStars
              count={5}
              value={resumo.rating}
              onChange={handleRating}
              size={30}
              activeColor="#ffd700"
            />
            <span> ({resumo.ratingCount || 0} votos)</span>
          </div>

          <div className="download-wrapper">
  <p className="avaliar-msg">A tua opinião faz a diferença! Avalia este resumo e apoia quem partilha.</p>
  <a
    href={`/api/uploads/${resumo._id || resumo.id}`}
    className="resumo-btn download-btn"
    download
  >
    Fazer Download
  </a>
</div>

        </div>

        <div className="map-section" style={{ marginTop: "30px" }}>
          {canPreview(resumo) ? (
            !previewError ? (
              <iframe
                src={`/api/uploads/view/${resumoId}`}
                width="100%"
                height="400"
                className="mapa"
                title="Pré-visualização"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <p className="error">Erro ao carregar pré-visualização do ficheiro.</p>
            )
          ) : (
            <p className="descricao-local">Pré-visualização não disponível para este tipo de ficheiro.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumoDetalhe;
