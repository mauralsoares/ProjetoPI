import React, { useState, useRef } from "react";
import "../assets/css/ResumoCard.css";

const ResumoCard = ({ resumo }) => {
  const [showPreview, setShowPreview] = useState(false); // Detalhes (aparece logo)
  const [showFilePreview, setShowFilePreview] = useState(false); // Ficheiro (aparece após 3s)
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

  return (
    <div
      className="resumo-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>{resumo.titulo}</h3>
      <p className="resumo-autor">{resumo.ownerEmail}</p>
      <div className="resumo-rating">
        ⭐ {resumo.rating?.toFixed(1) || "0,0"} ({resumo.ratingCount || 0})
      </div>
      <p className="resumo-desc">{resumo.descricao}</p>
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
              <iframe
                src={resumo.previewUrl}
                width="300"
                height="200"
                style={{ border: "none", marginTop: "0.5rem" }}
                title="Pré-visualização"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumoCard;