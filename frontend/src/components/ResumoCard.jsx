import React, { useState, useRef } from "react";
import "../assets/css/ResumoCard.css";
import { Link } from "react-router-dom";

const SUPPORTED_PREVIEW = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp"];

function canPreview(resumo) {
  if (!resumo) return false;
  const type = resumo.contentType || resumo.tipo || resumo.mimetype || "";
  if (type.startsWith("image/") || type === "application/pdf") return true;
  return SUPPORTED_PREVIEW.some((ext) =>
    (resumo.filename || resumo.nomeFicheiro || "").toLowerCase().endsWith(ext)
  );
}

const ResumoCard = ({ resumo }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const timerRef = useRef(null);

  const resumoId = resumo._id || resumo.id;

  const handleMouseEnter = () => {
    setShowPreview(true);
    timerRef.current = setTimeout(() => setShowFilePreview(true), 3000);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    setShowFilePreview(false);
    clearTimeout(timerRef.current);
  };

  return (
    <div
      className="resumo-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/resumo/${resumoId}`}
        state={{ resumo }}
        className="resumo-card-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>{resumo.titulo || "Sem título"}</h3>
        <div className="resumo-rating">
          ⭐ {resumo.rating?.toFixed(1) || "0,0"} ({resumo.ratingCount || 0})
        </div>
        <p className="resumo-desc">{resumo.descricao || "Sem descrição."}</p>
      </Link>
      <a
        href={`/api/uploads/${resumoId}`}
        className="resumo-btn"
        target="_blank"
        rel="noreferrer"
      >
        Download
      </a>
      {showPreview && (
        <div className="resumo-preview">
          <strong>Detalhes:</strong>
          <p>
            {resumo.preview ||
              resumo.descricao?.slice(0, 200) ||
              "Sem preview disponível."}
          </p>
          {/* Preview do ficheiro (PDF/imagem) só após 3s */}
          {showFilePreview && (
            <div className="file-preview">
              <strong>Pré-visualização do ficheiro:</strong>
              {canPreview(resumo) ? (
                !previewError ? (
                  <iframe
                    src={`/api/uploads/view/${resumoId}`}
                    width="300"
                    height="200"
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
          )}
        </div>
      )}
    </div>
  );
};

export default ResumoCard;