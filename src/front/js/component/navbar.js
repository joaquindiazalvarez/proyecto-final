import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [token, setToken] = useState("");
  const [profileNames, setProfileNames] = useState(store.profile_names);
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
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setProfileNames(store.profile_names);
  }, [store.loged, user]);

  console.log(store.profile_names);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link to="/home">
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
                  className="login btn btn-outline-success me-2"
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
              </div>
            )}
            {/*renders profile dropdown only if token exist */}
            {token && (
              <div className="dropdown">
                <button
                  className="login btn btn-outline-success me-2 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Perfil
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {/*renders profile names inside the dropdown*/}
                  {profileNames["name_list"]?.map((value, index) => {
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
                </ul>
              </div>
            )}
            {/* renders register button if there is not a token*/}
            {!token && (
              <Link
                to="/register"
                className="btn  btn-outline-warning"
                type="button"
              >
                Registrate
              </Link>
            )}
            {/* renders logout button if there is a token*/}
            {token && (
              <Link
                to="/login"
                className="btn btn-outline-warning"
                type="button"
                onClick={() => {
                  actions.logout();
                }}
              >
                Logout
              </Link>
            )}
          </form>
        </nav>
      </div>
    </nav>
  );
};
