import React from "react";
import "../assets/css/ResumoCard.css";
const ResumoCard = ({resumo}) => {
    return(
        <div className="resumo-card">
            <h3>{resumo.titulo}</h3>
            <p className="resumo-autor">{resumo.ownerEmail}</p>
            <div className="resumo-rating">
                ⭐ {resumo.rating?.toFixed(1) || "0,0"} ({resumo.ratingCount || 0})
            </div>
            <p className="resumo-desc">{resumo.descricao}</p>
            <a href={'http://localhost:4000/api/files/${resumo.id}/download'} className="resumo-btn" target="_blank" rel="noreferrer">
                Download PDF
            </a>
        </div>

    );
};

export default ResumoCard;