import React, { useState } from "react";
import "../assets/css/ResumoCard.css";
import { Link } from "react-router-dom";

const SUPPORTED_PREVIEW = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp"];

function canPreview(resumo) {
  const type = resumo?.contentType || resumo?.tipo || resumo?.mimetype || "";
  const filename = resumo?.filename || resumo?.nomeFicheiro || "";
  return (
    type.startsWith("image/") ||
    type === "application/pdf" ||
    SUPPORTED_PREVIEW.some(ext => filename.toLowerCase().endsWith(ext))
  );
}

const ResumoCard = ({ resumo }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const resumoId = resumo._id || resumo.id;

  return (
    <div className="resumo-card">
      <Link
        to={`/resumo/${resumoId}`}
        state={{ resumo }}
        className="resumo-card-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>{resumo.titulo || "Sem título"}</h3>
        <div className="resumo-rating">
          ⭐ {resumo.rating?.toFixed(1) || "0.0"} ({resumo.ratingCount || 0})
        </div>
        <p className="resumo-desc">{resumo.descricao || "Sem descrição."}</p>
      </Link>

      <div className="resumo-card-actions">
        <Link
          to={`/resumo/${resumoId}`}
          state={{ resumo }}
          className="resumo-btn"
        >
          Visualizar
        </Link>

        {canPreview(resumo) && (
          <button
            className="resumo-btn-outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Ocultar Preview" : "Ver Preview"}
          </button>
        )}
      </div>

      {showPreview && (
        <div className="resumo-preview">
          <strong>Pré-visualização:</strong>
          {!previewError ? (
            <iframe
              src={`/api/uploads/view/${resumoId}`}
              width="100%"
              height="220"
              title="Pré-visualização"
              style={{
                border: "none",
                marginTop: "0.5rem",
                borderRadius: "6px",
              }}
              onError={() => setPreviewError(true)}
            />
          ) : (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              Erro ao carregar pré-visualização do ficheiro.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumoCard; 