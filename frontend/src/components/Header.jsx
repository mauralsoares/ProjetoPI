import React from 'react';
import styles from './Header.module.css';
import { FaBars } from 'react-icons/fa';

const Header = ({ onToggleSidebar }) => (
  <header className={styles.header}>
    <div className={styles.leftSection}>
      <button className={styles.hamburger} onClick={onToggleSidebar}>
        <FaBars />
      </button>
      <img src="/imagens/iscte_logo-header.png" alt="ISCTE Logo" className={styles.logo} />
    </div>
    <div className={styles.profileIcon}>
      <img src="/imagens/profile-icon.png" alt="Perfil" />
    </div>
  </header>
);

export default Header;
