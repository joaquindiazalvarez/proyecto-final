import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const {} = useContext(Context);
  const [token, setToken] = useState("");
  const [profileNames, setProfileNames] = useState(store.profile_names);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setProfileNames(store.profile_names);
  }, [store.loged]);

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
              <Link
                to="/login"
                className="login btn btn-outline-success me-2"
                type="button"
              >
                Inicio de sesion
              </Link>
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
                          to={`/profile/${value}`}
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
