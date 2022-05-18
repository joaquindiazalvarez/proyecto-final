import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [token, setToken] = useState("");
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
    e.preventDefault();
    actions.postLogin(user).then(() => {
      actions.getProfileByUser();
    });
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, [store.loged, user]);

  //console.log(store.profile_names);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
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
                  Inicio de sesion
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
                          Close
                        </button>
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn btnRegister me-2"
                          data-bs-dismiss="modal"
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
              </div>
            )}
            {/*renders profile dropdown and link to favorites only if token exist */}
            {token && (
              <div className="dropdown">
                <Link
                  to={"/favorites"}
                  className="favorites btn BotonColor me-2"
                  type="button"
                >
                  Favoritos
                </Link>
                {/* <button
                  className="login btn BotonColor me-2 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Perfil
                </button> */}
                {/* <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                > */}
                {/*renders profile names inside the dropdown*/}
                <Link
                  type="button"
                  className="btn BotonColor me-2"
                  to={"/profile/" + store.user_profile.name}
                >
                  Perfil
                </Link>
                {/* {["name_list"]?.map((value, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className="dropdown-item"
                          to={"/profile/" + value}
                        >
                          {value}
                        </Link>
                      </li>
                    );
                  })}
                </ul> */}
                <Link
                  to="/"
                  className="btn BotonColor"
                  type="button"
                  onClick={() => {
                    actions.logout();
                  }}
                >
                  Logout
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
