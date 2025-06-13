// DEV: http://localhost:5173/login
// PROD: http://localhost:80/login

// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Login.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Log do que vai ser enviado
    console.log("LOGIN REQUEST BODY:", { email, password });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      // Log dos headers e status da resposta
      console.log("RESPONSE STATUS:", res.status);
      console.log("RESPONSE HEADERS:", [...res.headers.entries()]);

      
      // const data = await res.json();  
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Resposta inválida (não é JSON):", text);
        data = { error: "Erro interno no servidor." };
      }

      console.log("RESPONSE BODY:", data);
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setError(data.message || data.error || "Credenciais inválidas.");
      }
    } catch (err) {
      setError("Erro de ligação ao servidor.");
      console.error("FETCH ERROR:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/imagens/iscte_logo.jpg" alt="ISCTE Logo" className="logo" />
        <h1>LOGIN</h1>
        <p className="login-subtitle">Entra na sua conta ISCTE</p>


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email institucional</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                placeholder="aluno@iscte.pt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-icon">
                <FaEnvelope />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Palavra-passe</label>
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="password-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar ou ocultar palavra-passe"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
