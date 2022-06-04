import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(store.notifications);
  const [password, setPassword] = useState("");
  const user = { email: email, password: password };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.postLogin(user).then(() => {
      actions.getProfileByUser();
      actions.getAllNotifications();
    });
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setNotifications(store.notifications);
  }, [store.loged, user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black rounded">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link to="/">
            <img className="Logo" src={Logo} />
          </Link>
        </div>
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
            {/*renders login button if token doesnt exist*/}
            {!token && (
              <div>
                <button
                  className="login btn BotonColor me-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Inicio de sesión
                </button>
                {/*MODAL */}
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
                          Cerrar
                        </button>
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn btnRegister me-2"
                          data-bs-dismiss="modal"
                        >
                          Iniciar sesión
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/register" className="btn  BotonColor" type="button">
                  Regístrate
                </Link>
              </div>
            )}
            {/*renders buttons when session is loged*/}
            {token && (
              <div className="">
                <span className="dropdown">
                  <button
                    type="button"
                    className="btn BotonColor position-relative dropdown-toggle me-2 "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="far fa-bell"></i>

                    {notifications && notifications.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </span>
                    )}
                  </button>
                  <ul
                    className="dropdown-menu  dropdown-menu-dark"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {notifications &&
                      notifications.map((notifications, i) => {
                        return (
                          <li key={i}>
                            <p className="dropdown-item">
                              {notifications.name}
                              {notifications.type == "favorite"
                                ? " te agrego a favoritos"
                                : " ha hecho un nuevo post"}
                            </p>
                          </li>
                        );
                      })}
                  </ul>
                </span>

                <Link
                  to={"/favorites"}
                  className="favorites btn BotonColor me-2"
                  type="button"
                >
                  Favoritos
                </Link>
                <Link
                  type="button"
                  className="btn BotonColor me-2"
                  to={"/profile/" + store.user_profile?.name}
                >
                  Perfil
                </Link>
                <Link
                  to="/"
                  className="btn BotonColor"
                  type="button"
                  onClick={() => {
                    actions.logout();
                  }}
                >
                  Cerrar sesión
                </Link>
              </div>
            )}
            {/* renders logout button if there is a token*/}
          </form>
        </nav>
      </div>
    </nav>
  );
};
