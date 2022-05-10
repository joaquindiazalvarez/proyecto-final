import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = { email: email, password: password };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    actions.postLogin(user), e.preventDefault();
  };

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
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
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
                        onChange={handleEmail}
                        value={email}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Contraseña</label>
                      <input
                        onChange={handlePassword}
                        value={password}
                        type="password"
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
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btnRegister me-2"
                    >
                      Inicia Sesion
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/register" className="btn  BotonColor" type="button">
              Registrate
            </Link>
          </form>
        </nav>
      </div>
    </nav>
  );
};
