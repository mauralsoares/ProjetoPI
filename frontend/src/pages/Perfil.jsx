// src/pages/Perfil.jsx
import React, { useEffect, useState } from "react";
import "../assets/css/Perfil.css";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.files)) {
          setAllFiles(data.files);
        }
      })
      .catch((err) => console.error("Erro Get ficheiros:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Token não encontrado. Por favor faça login.");
      return;
    }

    fetch("/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro Get perfil");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => setErro(err.message));
  }, []);

  const tipoLabel =
    user?.tipo === "admin"
      ? "Administrador"
      : user?.tipo === "user"
      ? "Estudante"
      : user?.tipo;

  const dataRegisto = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Desconhecida";
  const avatarSeed = encodeURIComponent(user?.name || "User");
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`;

  const handleRemoverClassificacao = async (fileId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/ratings/${fileId}/remover`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Erro ao remover classificação");
      setUser(prev => ({
        ...prev,
        rates: prev.rates.filter(r => r.id !== fileId)
      }));
    } catch (error) {
      console.error("Erro:", error);
      alert("Não foi possível remover a classificação.");
    }
  };

  if (erro) return <div className="error">{erro}</div>;
  if (!user) return <div className="perfil-wrapper">A carregar perfil...</div>;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-container">
        <h2>Perfil do Utilizador</h2>
        <hr className="divider" />

        <div className="perfil-info-avatar">
          <div className="perfil-info">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Conta:</strong> {tipoLabel}</p>
            <p><strong>Registado a:</strong> <span style={{ fontSize: '0.85em' }}>{dataRegisto}</span></p>
          </div>
          <div className="perfil-avatar">
            <img src={avatarUrl} alt="Avatar" />
          </div>
        </div>
      </div>

      {user.tipo === "user" && (
        <div className="sections-container">
          {/* Primeira linha: uploads + classificações */}
          <div className="row-section wide-row">
            <div className="uploads-section section-box">
              <div className="section-header">
                <h3>Os teus uploads 📁</h3>
                <button className="clear-btn" title="Apagar todos">🗑️</button>
              </div>
              {Array.isArray(allFiles) && allFiles.length > 0 ? (
                allFiles.filter(file => file.owner === user.email).map((file, index) => (
                  <div key={index} className="rate-item">
                    <div>
                      <strong>{file.titulo}</strong>
                      <div style={{ fontSize: "0.85em", color: "#444" }}>
                        UC: {file.uc || "Desconhecida"} | Curso: {file.curso || "—"}
                      </div>
                    </div>
                    <div>
                      <span>⭐ {file.media || "—"}</span>
                      <button style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                        <img src="https://img.icons8.com/ios7/512/trash.png" alt="Remover" style={{ width: "20px", height: "20px" }} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="placeholder">Ainda não enviaste nenhum resumo.</p>
              )}
            </div>

            <div className="rates-section section-box">
              <div className="section-header">
                <h3>As tuas classificações ⭐</h3>
                <button className="clear-btn" title="Apagar todas">🗑️</button>
              </div>
              {Array.isArray(user.rates) && user.rates.length > 0 ? (
                user.rates.map((rate, index) => {
                  const file = allFiles.find(f => f.id === rate.id);
                  return (
                    <div key={index} className="rate-item">
                      <div>
                        <strong>{file ? file.titulo : "Ficheiro não encontrado"}</strong>
                        <div style={{ fontSize: "0.85em", color: "#444" }}>
                          UC: {file?.uc || "Desconhecida"} | Curso: {file?.curso || "—"}
                        </div>
                      </div>
                      <div>
                        <span>⭐ {rate.nota}</span>
                        <button onClick={() => handleRemoverClassificacao(rate.id)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                          <img src="https://img.icons8.com/ios7/512/trash.png" alt="Remover" style={{ width: "20px", height: "20px" }} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="placeholder">Ainda não classificaste nenhum resumo.</p>
              )}
            </div>
          </div>

          {/* Segunda linha: locais + mapa */}
          <div className="row-section wide-row">
            <div className="locais-section section-box">
              <div className="section-header">
                <h3>Locais adicionados 📍</h3>
                <button className="clear-btn" title="Apagar todos">🗑️</button>
              </div>
              {Array.isArray(user.locais) && user.locais.length > 0 ? (
                user.locais.map((local, index) => (
                  <div key={index} className="rate-item">
                    <div>
                      <strong>{local.nome || "Local sem nome"}</strong>
                      <div style={{ fontSize: "0.85em", color: "#444" }}>
                        {local.descricao || "Sem descrição"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="placeholder">Ainda não adicionaste nenhum local de estudo.</p>
              )}
            </div>

            <div className="map-section section-box">
              <h3>Mapa dos teus locais 🗺️</h3>
              <div className="map-placeholder">
                Mapa em construção...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
