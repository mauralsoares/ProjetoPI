import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import '../assets/css/sidebar.css'; // onde colocaremos estilos adicionais se necessário

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className={`layout-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar onClose={() => setSidebarOpen(false)} />
      
      {/* Conteúdo principal */}
      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
