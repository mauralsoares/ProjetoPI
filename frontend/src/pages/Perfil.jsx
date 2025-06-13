import React, { useEffect, useState } from "react";
import "../assets/css/Perfil.css";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState(null);
  const [userUploads, setUserUploads] = useState([]);
  const [editNome, setEditNome] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [loadingNome, setLoadingNome] = useState(false);

  // Buscar perfil do utilizador autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Token não encontrado. Por favor faça login.");
      return;
    }
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setErro(err.message));
  }, []);

  // Buscar uploads do utilizador autenticado (por email)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user?.email && token) {
      fetch(`/api/files?email=${encodeURIComponent(user.email)}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.files)) setUserUploads(data.files);
        })
        .catch(err => console.error("Erro ao buscar uploads:", err));
    }
  }, [user]);

  // Apagar upload
  const handleApagarUpload = async (fileId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/uploads/${fileId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Erro ao apagar o ficheiro.");
      setUserUploads(prev => prev.filter(f => f._id !== fileId));
    } catch (err) {
      alert("Não foi possível apagar o upload.");
    }
  };

  // Atualizar nome do utilizador
  const handleAtualizarNome = async () => {
    if (!novoNome.trim()) return;
    setLoadingNome(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: novoNome })
      });
      if (!res.ok) throw new Error("Erro ao atualizar nome");
      const data = await res.json();
      setUser(prev => ({ ...prev, name: data.name }));
      setEditNome(false);
    } catch (err) {
      alert("Não foi possível atualizar o nome.");
    }
    setLoadingNome(false);
  };

  if (erro) return <div className="error">{erro}</div>;
  if (!user) return <div className="perfil-wrapper">A carregar perfil...</div>;

  const tipoLabel =
    user.tipo === "admin"
      ? "Administrador"
      : user.tipo === "user"
      ? "Estudante"
      : user.tipo;

  const dataRegisto = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "Desconhecida";
  const avatarSeed = encodeURIComponent(user.name || "User");
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-container">
        <h2>Perfil do Utilizador</h2>
        <hr className="divider" />

        <div className="perfil-info-avatar">
          <div className="perfil-info">
            <p>
              <strong>Nome:</strong>{" "}
              {editNome ? (
                <>
                  <input
                    type="text"
                    value={novoNome}
                    onChange={e => setNovoNome(e.target.value)}
                    style={{ width: "120px" }}
                    disabled={loadingNome}
                  />
                  <button onClick={handleAtualizarNome} disabled={loadingNome || !novoNome.trim()}>Guardar</button>
                  <button onClick={() => setEditNome(false)} disabled={loadingNome}>Cancelar</button>
                </>
              ) : (
                <span
                  style={{ cursor: "pointer", textDecoration: "underline dotted" }}
                  title="Clique para editar"
                  onClick={() => {
                    setNovoNome(user.name);
                    setEditNome(true);
                  }}
                >
                  {user.name}
                </span>
              )}
            </p>
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
          <div className="row-section wide-row">
            <div className="uploads-section section-box">
              <div className="section-header">
                <h3>Os teus uploads 📁</h3>
                <button className="clear-btn" title="Apagar todos" disabled>🗑️</button>
              </div>
              <div className="section-content">
                {userUploads.length > 0 ? (
                  userUploads.map((file) => (
                    <div key={file._id} className="upload-item">
                      <div>
                        <strong>{file.titulo}</strong>
                        <div style={{ fontSize: "0.85em", color: "#444" }}>
                          UC: {file.uc || "Desconhecida"} | Curso: {file.curso || "—"}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span title="Classificação média">
                          <span style={{ color: "#f5b400", fontSize: 18 }}>⭐</span> {file.rating !== undefined ? file.rating.toFixed(1) : "—"}
                        </span>
                        <button
                          onClick={() => handleApagarUpload(file._id)}
                          title="Apagar ficheiro"
                        >
                          <img src="https://img.icons8.com/ios7/512/trash.png" alt="Remover" style={{ width: "20px", height: "20px" }} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="placeholder">Ainda não enviaste nenhum resumo.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;