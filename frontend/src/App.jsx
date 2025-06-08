//frontend\src\App.jsx

import { Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Registo from './pages/Registo.jsx';
import Home from './pages/Home.jsx';
import Perfil from './pages/Perfil.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import './assets/css/styles.css';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isLoginPage = path === "/login" || path === "/registo";

 
    return (
      <>
        {!isLoginPage && <Header />}
        <div style={{ marginLeft: '250px', paddingTop: '80px', paddingBottom: '70px' }}></div>
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

export default App;






// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// import Login from './pages/Login.jsx';
// import Registo from './pages/Registo.jsx';
// import Home from './pages/Home.jsx';
// import Perfil from './pages/Perfil.jsx';

// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Navbar from './components/Navbar.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';

// import './assets/css/styles.css';

// function AppContent() {
//   const location = useLocation();
//   const path = location.pathname.toLowerCase(); // já está em minúsculas
//   const isLoginPage = path === "/login" || path === "/registo"; // usa 'path' aqui!

//   return (
//     <>
//       {!isLoginPage && <Header />}
//       {!isLoginPage && <Navbar />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/perfil"
//           element={
//             <PrivateRoute>
//               <Perfil />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/registo" element={<Registo />} />
//       </Routes>

//       {!isLoginPage && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;
