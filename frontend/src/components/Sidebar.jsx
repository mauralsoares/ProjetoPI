import React from "react";
import '../assets/css/sidebar.css';
import { FaHome, FaCalendarAlt, FaFileAlt, FaUpload, FaMapMarkerAlt, FaGraduationCap, FaCreditCard } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout clicado");
        localStorage.removeItem('token');
        navigate('/login');
    }
    return(
        <nav className="sidebar">
            <ul>
                <li><Link to="/home" className="sidebar-link"><FaHome /> Home</Link></li>
                <li><FaCalendarAlt/>Calendário</li>
                <li><Link to="/resumos" className="sidebar-link"><FaFileAlt /> Resumos</Link></li>
                <li><Link to="/uploadresumo" className="sidebar-link"><FaUpload /> Upload de Resumos</Link></li>
                <li><FaMapMarkerAlt/>Locais de Estudo</li>
                <li><FaGraduationCap />Curso</li>
                <li><FaCreditCard />Pagamentos</li>
            </ul>
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
        </nav>
    );
};

export default Sidebar;
