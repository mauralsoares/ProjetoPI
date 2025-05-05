import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="col-md-3 col-lg-2 bg-light p-3">
    <div className="sticky-top pt-3">
      <h5 className="border-bottom pb-2">Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link active" to="/">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/perfil">Perfil</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Configurações</a>
        </li>
      </ul>
    </div>
  </aside>
);

export default Sidebar;