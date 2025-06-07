// DEV: http://localhost:5173/registo
// PROD: http://localhost:80/registo

// 📂 src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Registo.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

 // Verifica se o utilizador já está autenticado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setError(""); // Limpa mensagens de erro anteriores
    setSuccess(false); // Limpa mensagens de sucesso anteriores

    if (password !== confirmPassword) {
      // Verifica se as palavras-passe não coincidem
      setError("As palavras-passe não coincidem.");
      return;
    }
    // Se coicidirem, prossegue com o registo


    
   try {
    const res = await fetch('/api/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        email,
        password,
        // type: "user" Default 
        // createdAT: Date.now Default
      }),
    });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setTimeout(() => navigate("/home"), 1500);
      } else if (data.error === "Email já está em uso") {
        setError("Este email já está registado. Faça login ou contacte o suporte.");
      } else {
        setError(data.message || data.error || "Erro ao registar utilizador.");
      }
    } catch (err) {
      setError("Erro de ligação ao servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>ISCTE APP</h1>
        <h2>Registo</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Nome de utilizador</label>
          <input
            type="text"
            id="username"
            placeholder="ex: joana.silva"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password">Confirmar palavra-passe</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Conta criada com sucesso! A redirecionar...</p>}

          <button type="submit">Registar</button>
        </form>

        <p className="register-link">
          Já tens conta? <Link to="/login">Inicia sessão</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
