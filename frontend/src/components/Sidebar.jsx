import React from "react";
import '../assets/css/sidebar.css';
import { FaHome, FaCalendarAlt, FaFileAlt, FaUpload, FaMapMarkerAlt, FaGraduationCap, FaCreditCard } from 'react-icons/fa';

const Sidebar = ({ aberto, onClose }) => {
  return (
    <nav className={`sidebar ${aberto ? 'aberto' : ''}`}>
      <ul onClick={onClose}>
        <li><FaHome />Home</li>
        <li><FaCalendarAlt />Calendário</li>
        <li><FaFileAlt />Resumos</li>
        <li><FaUpload />Upload de Resumo</li>
        <li><FaMapMarkerAlt />Locais de Estudo</li>
        <li><FaGraduationCap />Curso</li>
        <li><FaCreditCard />Pagamentos</li>
      </ul>
      <div className="logout-container">
        <button className="logout-button" onClick={onClose}>Log Out</button>
      </div>
    </nav>
  );
};

export default Sidebar;
