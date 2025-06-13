import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("/imagens/profile-icon.png");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.name) {
          const seed = encodeURIComponent(data.name);
          setAvatarUrl(`https://api.dicebear.com/7.x/initials
            s/svg?seed=${seed}`);
        }
      })
      .catch(() => {
        setAvatarUrl("/imagens/profile-icon.png");
      });
  }, []);

  return (
    <header className={styles.header}>
      {/* Botão menu só visível em mobile (usa CSS para esconder em desktop) */}
      <button
        className={styles.menuButton}
        onClick={onToggleSidebar}
        aria-label="Abrir menu"
        title="Abrir menu"
        type="button"
      >
        ☰
      </button>
      <div className={styles.logoArea} onClick={() => navigate("/home")} title="Ir para a página inicial">
        <img src="/imagens/iscte_logo-header.png" alt="ISCTE Logo" className={styles.logo} />
      </div>
      <div className={styles.profileIcon} onClick={() => navigate("/perfil")}>
        <img
          src={avatarUrl}
          alt="Avatar do utilizador"
          title="Perfil"
        />
      </div>
    </header>
  );
};

export default Header;



