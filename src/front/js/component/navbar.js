import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <div className="container-fluid">
        <a className="navbar-brand">
          <Link to="/home">
            <img className="Logo" src={Logo} />
          </Link>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="navbar navbar-light bg-black">
          <form className="container-fluid justify-content-start">
            <Link
              to="/demo"
              className="login btn btn-outline-success me-2"
              type="button"
            >
              Inicio de sesion
            </Link>

            <Link
              to="/register"
              className="btn  btn-outline-warning"
              type="button"
            >
              Registrate
            </Link>
          </form>
        </nav>
      </div>
    </nav>
  );
};
