import React from "react";
import { Navigate } from "react-router-dom";
import Forbidden from "../pages/Forbidden.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Forbidden />;
}

export default PrivateRoute;
