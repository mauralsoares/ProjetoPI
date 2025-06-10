import React from 'react'
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.left}>
      <div className={styles.title}>Iscte – Instituto Universitário de Lisboa</div>
      <div>Avenida das Forças Armadas, 1649-026 Lisboa,
        TEL +351 217 903 000,
        geral@iscte.pt
         </div>
    </div>
    <div className={styles.right}>
      &copy; {new Date().getFullYear()}
    </div>
  </footer>
);

export default Footer;