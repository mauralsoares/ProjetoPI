import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Login.jsx';
import Registo from './pages/Registo.jsx';
import Home from './pages/Home.jsx';
import Perfil from './pages/Perfil.jsx';
import Mapa from './pages/Mapa';
import LocaisEstudo from './pages/LocaisEstudo';

import MapaTeste from './components/MapTest.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import './assets/css/styles.css';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isLoginPage = path === "/login" || path === "/registo";

  // 👉 novo estado para abrir/fechar menu
  const [sidebarAberto, setSidebarAberto] = useState(false);

  return (
    <>
      {!isLoginPage && <Header onToggleSidebar={() => setSidebarAberto(prev => !prev)} />}
      {!isLoginPage && <Sidebar aberto={sidebarAberto} onClose={() => setSidebarAberto(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registo" element={<Registo />} />
        <Route path="/mapa-teste" element={<MapaTeste />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/locaisestudo" element={<LocaisEstudo />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
