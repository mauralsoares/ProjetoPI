//frontend\src\App.jsx

import { Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Registo from './pages/Registo.jsx';
import Home from './pages/Home.jsx';
import Perfil from './pages/Perfil.jsx';
import Mapa from './pages/Mapa';
import LocaisEstudo from './pages/LocaisEstudo';
import Resumos from './pages/Resumos.jsx';
import UploadResumo from './pages/UploadResumo.jsx';
import ResumoDetalhe from "./pages/ResumoDetalhe";
import MeusLocais from './pages/MeusLocais';


import MapaTeste from './components/MapTest.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Layout from './components/layout.jsx';

import './assets/css/styles.css';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

 
  const isLoginPage = path === "/login" || path === "/registo"; // <-- ADICIONA ESTA LINHA

  return (
    <>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registo" element={<Registo />} />

        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/perfil" element={<Layout><PrivateRoute><Perfil /></PrivateRoute></Layout>} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path='/resumos' element={<Layout><Resumos /></Layout>} />
        <Route path='/uploadresumo' element={<Layout><UploadResumo /></Layout>} />
        <Route path="/resumo/:id" element={<Layout><ResumoDetalhe /></Layout>} />
        <Route path="/mapa-teste" element={<MapaTeste />} />
        <Route path="/mapa" element={<Layout><Mapa /></Layout>} />
        
        <Route path="/locaisestudo" element={<Layout><LocaisEstudo /></Layout>} />
        <Route path="/meuslocais" element={<Layout><MeusLocais /></Layout>}/>


      </Routes>
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
