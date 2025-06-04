// DEV: http://localhost:5173/login
// PROD: http://localhost:80/login

// 📂 src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Guardar o token JWT no localStorage
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setError(data.message || "Email ou palavra-passe incorretos.");
      }
    } catch (err) {
      setError("Erro ao ligar ao servidor. Tenta novamente mais tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>ISCTE APP</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email institucional</label>
          <input
            type="email"
            id="email"
            placeholder="aluno@iscte.pt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Palavra-passe</label>
          <div className="password-wrapper">
            <input
              type="password"
              id="password"
              className="password-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Autenticado com sucesso! Redirecionando...</p>}

          <button type="submit">Entrar</button>
        </form>

        <p className="registo-link">
          Não tens conta? <Link to="/registo">Regista-te</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


/*
🧩 Componente: Login.jsx
📂 Local: /src/pages/Login.jsx
🎨 Estilo: /src/assets/css/Login.css
🖼️ Imagens usadas: /assets/login-bg.jpg

🔐 Utiliza JWT: Sim, com localStorage
⚙️ Hooks: useState, useNavigate
➡️ Submissão: POST para /api/login
*/