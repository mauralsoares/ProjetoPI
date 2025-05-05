import React from 'react';
import Sidebar from '../components/Sidebar';

const Perfil = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container-fluid flex-grow-1">
        <div className="row">
          <Sidebar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-3">
            <section className="mb-5">
              <h2>Meu Perfil</h2>
              <p>Conteúdo da página de perfil aqui...</p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Perfil;