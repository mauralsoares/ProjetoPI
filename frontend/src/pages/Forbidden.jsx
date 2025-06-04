// 📂 src/pages/Forbidden.jsx
import React from "react";
import "../assets/css/Forbidden.css";

function Forbidden() {
  return (
    <div className="forbidden-wrapper">
      <div className="gandalf">
        <div className="fireball"></div>
        <div className="skirt"></div>
        <div className="sleeves"></div>
        <div className="shoulders">
          <div className="hand left"></div>
          <div className="hand right"></div>
        </div>
        <div className="head">
          <div className="hair"></div>
          <div className="beard"></div>
        </div>
      </div>
      <div className="message">
        <h1>403 - YOU SHALL NOT PASS!</h1>
        <p>
          Gandalf está a proteger esta área do ISCTE APP.<br />
          Por favor autentica-te primeiro para acederes a esta página.
        </p>
      </div>
    </div>
  );
}

export default Forbidden;
