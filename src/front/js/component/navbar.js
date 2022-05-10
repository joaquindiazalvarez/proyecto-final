import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img className="Logo" src={Logo} />
        </Link>

        <nav className="navbar navbar-light bg-black">
          <form className="container-fluid justify-content-start">
            <button
              className="btn BotonColor me-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Inicio de sesion
            </button>

            {/*MODAL*/}
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      HOLA!
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  {/*MODALBODY*/}
                  <div className="modal-body">
                    <h5>Un gusto tenerte de regreso!</h5>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                      />
                    </div>
                  </div>

                  {/*modalfooter*/}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btnClose"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btnRegister me-2">
                      Inicia Sesion
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/registro" className="btn  BotonColor" type="button">
              Registrate
            </Link>
          </form>
        </nav>
      </div>
    </nav>
  );
};
