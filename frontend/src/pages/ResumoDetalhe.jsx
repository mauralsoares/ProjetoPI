import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import "../assets/css/ResumoDetalhe.css";

function ResumoDetalhe() {
    const{id} = useParams();
    const [resumo, setResumo] = useState(null);
    const [previewError, setPreviewError] = useState(false);

    useEffect(() => {
        axios.get(`/resumo/${resumo.id}`)
            .then((res) => console.log("Resumo recebido:", res.data), setResumo(res.data))
            .catch((err) => console.error("Erro ao buscar resumo:", err));
    }, [id]);

    const handleRating = (newRating) => {
        const token = localStorage.getItem("token");
        axios.post(`/api/uploads/${id}/classificar`, { nota: newRating }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            alert(res.data.mensagem);

            // Atualiza os dados localmente para refletir nova média
            setResumo((prev) => ({
                ...prev,
                rating: res.data.rating,
                ratingCount: res.data.ratingCount,
            }));
        })
        .catch((err) => {
            console.error("Erro ao enviar classificação:", err);
            alert("Não foi possível classificar. Verifica se estás autenticado ou se estás a tentar classificar o teu próprio ficheiro.");
        });
    };

    if (!resumo) return <p>A carregar resumo...</p>;

    return(
         <>
            {!resumo ? (
                <p>A carregar resumo...</p>
            ) : (
                <div className="resumo-detalhe">
                    <h1>{resumo.titulo}</h1>
                    <p><strong>Autor:</strong> {resumo.ownerEmail || "Desconhecido"}</p>
                    <p>{resumo.descricao || "Sem descrição."}</p>

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

                    

                        <a href={`/api/uploads/${resumo.id}`} className="resumo-btn" download>
                            Download
                        </a>
                </div>
            )}
        </>
    );
}

export default ResumoDetalhe;