import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../assets/css/ResumoDetalhe.css";

const SUPPORTED_PREVIEW = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp"];

function canPreview(resumo) {
  if (!resumo) return false;
  const type = resumo.contentType || resumo.tipo || resumo.mimetype || "";
  if (type.startsWith("image/") || type === "application/pdf") return true;
  return SUPPORTED_PREVIEW.some((ext) =>
    (resumo.previewUrl || resumo.nomeFicheiro || resumo.filename || "").toLowerCase().endsWith(ext)
  );
}

function ResumoDetalhe() {
  const { id } = useParams();
  const location = useLocation();
  // Usa o resumo do state se vier do Link, senão vai buscar ao backend
  const [resumo, setResumo] = useState(location.state?.resumo || null);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!resumo) {
      fetch(`/api/files?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          let ficheiro = null;
          if (Array.isArray(data)) {
            ficheiro = data[0];
          } else if (data.files && Array.isArray(data.files)) {
            ficheiro = data.files[0];
          } else {
            ficheiro = data;
          }
          setResumo(ficheiro);
          console.log("Resumo recebido:", ficheiro);
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
      .catch((err) => {
        console.error("Erro ao enviar classificação:", err);
        alert("Não foi possível classificar. Verifica se estás autenticado ou se estás a tentar classificar o teu próprio ficheiro.");
      });
  };

  if (!resumo) return <p>A carregar resumo...</p>;

  const resumoId = resumo._id || resumo.id;

  return (
    <div className="resumo-detalhe">
      <h1>{resumo.titulo || "Sem título"}</h1>
      <p>
        <strong>Upload por: </strong> {resumo.ownerEmail || resumo.author || resumo.email || "Desconhecido"}
      </p>
      <p><strong>Descrição: </strong>{resumo.descricao || "Sem descrição."}</p>

      <p><strong>UC: </strong> {resumo.uc || "Não especificada"}</p>
      <p><strong>Curso: </strong> {resumo.curso || "Não especificado"}</p>
      <p><strong>Ano: </strong> {resumo.ano || "Não especificado"}</p>
      <p>
        <strong>Data de upload: </strong>{" "}
        {resumo.createdAt || resumo.uploadedAt
          ? new Date(resumo.createdAt || resumo.uploadedAt).toLocaleDateString()
          : "Desconhecida"}
      </p>
      <p>
        <strong>Tamanho do ficheiro: </strong>{" "}
        {resumo.size ? (resumo.size / 1024).toFixed(2) + " KB" : "Desconhecido"}
      </p>
      <p>
        <strong>Tipo de ficheiro: </strong>{" "}
        {resumo.contentType || resumo.tipo || resumo.mimetype || "Desconhecido"}
      </p>
      <p>
        <strong>Nome do ficheiro: </strong>{" "}
        {resumo.nomeFicheiro || resumo.filename || "Desconhecido"}
      </p>

      <div className="rating-section">
        <strong>Avaliação:</strong>
        <ReactStars
          count={5}
          value={resumo.rating}
          onChange={handleRating}
          size={30}
          activeColor="#ffd700"
        />
        <span>({resumo.ratingCount || 0} votos)</span>
      </div>

      <a href={`/api/uploads/${resumoId}`} className="resumo-btn" download>
        Download
      </a>

      <div style={{ marginTop: "2rem" }}>
        <strong>Pré-visualização do ficheiro:</strong>
        {canPreview(resumo) ? (
          !previewError ? (
            <iframe
              src={`/api/uploads/view/${resumoId}`}
              width="600"
              height="400"
              style={{ border: "none", marginTop: "0.5rem" }}
              title="Pré-visualização"
              onError={() => setPreviewError(true)}
            />
          ) : (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              Erro ao carregar pré-visualização do ficheiro.
            </div>
          )
        ) : (
          <div style={{ color: "gray", marginTop: "0.5rem" }}>
            Pré-visualização não disponível para este tipo de ficheiro.
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumoDetalhe;