import React from 'react';
import styles from './Header.module.css';

const Header = ({ onToggleSidebar }) => (
  <header className={styles.header}>
    <button className={styles.menuButton} onClick={onToggleSidebar}>
      ☰
    </button>
    <div className={styles.logoArea}>
      <img src="/imagens/iscte_logo-header.png" alt="ISCTE Logo" className={styles.logo} />
    </div>
    <div className={styles.profileIcon}>
      <img src="/imagens/profile-icon.png" alt="Perfil" />
    </div>
  </header>
);


export default Header;
