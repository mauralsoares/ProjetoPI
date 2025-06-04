import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Registo from './pages/Registo.jsx';
import Home from './pages/Home.jsx';
import Perfil from './pages/Perfil.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import './assets/css/styles.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/registo";

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && <Navbar />}

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
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
