import React from "react";
import '../assets/css/sidebar.css';
import { FaHome, FaCalendarAlt, FaFileAlt, FaUpload, FaMapMarkerAlt, FaGraduationCap, FaCreditCard } from 'react-icons/fa';


const Sidebar = () => {
    return(
        <nav className="sidebar">
            <ul>
                <li><FaHome/>Home</li>
                <li><FaCalendarAlt/>Calendário</li>
                <li><FaFileAlt/>Resumos</li>
                <li><FaUpload/>Upload de Resumo</li>
                <li><FaMapMarkerAlt/>Locais de Estudo</li>
                <li><FaGraduationCap />Curso</li>
                <li><FaCreditCard />Pagamentos</li>
            </ul>
            <div className="logout-container">
              <button className="logout-button">Log Out</button>
            </div>
        </nav>
    );
};

export default Sidebar;
