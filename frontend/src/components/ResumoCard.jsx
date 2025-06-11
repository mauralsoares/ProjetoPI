import React, { useState, useRef } from "react";
import "../assets/css/ResumoCard.css";
import {Link} from 'react-router-dom';

const SUPPORTED_PREVIEW = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp"];

function canPreview(resumo) {
  // Preferencialmente usa o tipo/contentType se existir
  if (resumo.contentType) {
    return resumo.contentType.startsWith("image/") || resumo.contentType === "application/pdf";
  }
  // fallback para extensão do nome do ficheiro
  return SUPPORTED_PREVIEW.some((ext) =>
    (resumo.previewUrl || resumo.nomeFicheiro)?.toLowerCase().endsWith(ext)
  );
}

const ResumoCard = ({ resumo }) => {
  const [showPreview, setShowPreview] = useState(false); // Detalhes (aparece logo)
  const [showFilePreview, setShowFilePreview] = useState(false); // Ficheiro (aparece após 3s)
  const [previewError, setPreviewError] = useState(false); // para evitar que o browser tente fazer preview de ficheiros não suportados o que origina o download automatico do ficheiro (TM)
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setShowPreview(true); // Mostra detalhes logo
    timerRef.current = setTimeout(() => setShowFilePreview(true), 3000); // Mostra ficheiro após 3s
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    setShowFilePreview(false);
    clearTimeout(timerRef.current);
  };

  console.log("Preview filename:", resumo.previewUrl || resumo.nomeFicheiro);

  return (
    <div
      className="resumo-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/resumo/${resumo.id}`} className="resumo-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>{resumo.titulo}</h3>
        <div className="resumo-rating">
          ⭐ {resumo.rating?.toFixed(1) || "0,0"} ({resumo.ratingCount || 0})
        </div>
      <p className="resumo-desc">{resumo.descricao}</p>
      </Link>
      <a
        href={`/api/uploads/${resumo.id}`}
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
                    src={resumo.previewUrl}
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