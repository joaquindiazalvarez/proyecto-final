import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(store.notifications);
  const [oldNotifications, setOldNotifications] = useState(store.notifications);
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
    console.log("cambia notifications");
    setNotifications(store.notifications);
  }, [store.loged, user]);
  function areEqual(arr1, arr2) {
    console.log("arrays", arr1, arr2);
    if (arr2 == undefined || arr1 == undefined) {
      return false;
    } else if (arr1.length !== arr2.length) {
      return false;
    } else if ((arr1.length === 0 && arr2.length === 0) || arr2.length === 0) {
      return true;
    } else if (arr1.length === arr2.length && arr1.length > 0) {
      if (
        arr1[arr1.length - 1]["id"] !== arr2[arr2.length - 1]["id"] ||
        arr1[arr1.length - 1]["type"] !== arr2[arr2.length - 1]["type"]
      ) {
        return false;
      } else {
        return true;
      }
    }
    console.log(arr1.length - 1);
  }
  useEffect(() => {
    if (areEqual(oldNotifications, notifications)) {
      console.log("son iguales");
    } else {
      setOldNotifications(notifications);
      actions.notificationAlert();
      console.log("son distintos");
    }
  }, [notifications]);

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
                    onClick={() => actions.eraseNotificationAlert()}
                  >
                    <i className="far fa-bell"></i>

                    {notifications &&
                      store.notifications_read === false &&
                      notifications.length > 0 && (
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
                      notifications.slice(0, 8).map((notifications, i) => {
                        return (
                          <Link
                            to={"/profile/" + notifications.name}
                            style={{ textDecoration: "none" }}
                          >
                            <li key={i}>
                              <p className="dropdown-item">
                                {notifications.name}
                                {notifications.type == "favorite"
                                  ? " te agrego a favoritos"
                                  : " ha hecho un nuevo post"}
                                <p
                                  className="date"
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "10px",
                                  }}
                                >
                                  {notifications.date.slice(0, -10)}
                                </p>
                              </p>
                            </li>
                          </Link>
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
