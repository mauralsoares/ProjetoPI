import React from "react";
import '../assets/css/sidebar.css';
import {
  FaHome,
  FaCalendarAlt,
  FaFileAlt,
  FaUpload,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCreditCard,
} from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicado");
    localStorage.removeItem('token');
    if (onClose) onClose(); 
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/home" className="sidebar-link" onClick={onClose}><FaHome /> Home</Link></li>
        <li><FaCalendarAlt/>Calendário</li>
        <li><Link to="/resumos" className="sidebar-link" onClick={onClose}><FaFileAlt /> Resumos</Link></li>
        <li><Link to="/uploadresumo" className="sidebar-link" onClick={onClose}><FaUpload /> Upload de Resumos</Link></li>
        <li><Link to="/mapa" className="sidebar-link" onClick={onClose}><FaMapMarkerAlt /> Locais de Estudo</Link></li>
        <li><FaGraduationCap />Curso</li>
        <li><FaCreditCard />Pagamentos</li>
      </ul>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;


