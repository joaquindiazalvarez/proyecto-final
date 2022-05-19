import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import registroimg from "../../img/registroimg.jpg";
import { Link, Redirect } from "react-router-dom";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setBirthDate] = useState("");
  const [gender, setgender] = useState("");
  const [favMusicgenre, setFavMusicgenre] = useState("");
  const registerUser = {
    name: name,
    email: email,
    password: password,
    date_of_birth: date_of_birth,
    gender: gender,
    favMusicgenre: favMusicgenre,
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };
  const handlegender = (e) => {
    setgender(e.target.value);
  };
  const handlefavMusicgenre = (e) => {
    setFavMusicgenre(e.target.value);
  };
  console.log(registerUser);

  const regexname = /^[ \a-zA-Z0-9]+$/;
  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexpassword =
    /^(?=.*[A-Z])(?=.*[!@#$&*.+-_])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  const testname = regexname.test(name);
  const testemail = regexemail.test(email);
  const testpassword = regexpassword.test(password);

  const handleSubmit = (e) => {
    actions.postRegister(registerUser), e.preventDefault();
  };
  const preventDef = (e) => {
    e.preventDefault();
  };

  //
  let colorName = "";
  if (testname == true) {
    colorName = "form-control form-control-lg border border-success";
  } else colorName = "form-control form-control-lg border border-danger";
  //
  let colorEmail = "";
  if (testemail == true) {
    colorEmail = "form-control form-control-lg border border-success";
  } else colorEmail = "form-control form-control-lg border border-danger";
  //
  let colorPassword = "";
  if (testpassword == true) {
    colorPassword = "form-control form-control-lg border border-success";
  } else colorPassword = "form-control form-control-lg border border-danger";

  const onSubmit = (a, b) => {
    if (testname == true && testemail == true && testpassword == true) {
      handleSubmit(a, b);
    } else preventDef(a);
  };
  return (
    <section className="h-100 bg-light">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img src={registroimg} className="imgRegister" />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registrate</h3>

                    <div className="row">
                      <div className="form-outline mb-4">
                        <label className="form-label">
                          Como quieres que te llamemos?
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            onChange={handleName}
                            value={name}
                            type="text"
                            className={colorName}
                            placeholder="Ingrese un usuario"
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <div className="form-outline">
                          <label className="form-label">
                            Ingresa tu correo electronico
                          </label>
                          <input
                            onChange={handleEmail}
                            value={email}
                            type="text"
                            className={colorEmail}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Crea una contraseña</label>
                      <input
                        onChange={handlePassword}
                        value={password}
                        type="password"
                        className={colorPassword}
                        placeholder="Ingresa tu clave"
                      />
                      <p className="text-muted">Contraseña alfanumerica</p>
                    </div>

                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Genero: </h6>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          onChange={handlegender}
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="femaleGender"
                          value="female"
                        />
                        <label className="form-check-label">Mujer</label>
                      </div>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          onChange={handlegender}
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="maleGender"
                          value="male"
                        />
                        <label className="form-check-label">Hombre</label>
                      </div>

                      <div className="form-check form-check-inline mb-0">
                        <input
                          onChange={handlegender}
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="otherGender"
                          value="non-binary"
                        />
                        <label className="form-check-label">No binario</label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <form>
                        <label>Ingrese fecha de nacimiento:</label>
                        <input
                          onChange={handleBirthDate}
                          value={date_of_birth}
                          type="date"
                          name="birthday"
                        />
                      </form>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="col-md-6 mb-4">
                        <label>Selecciona tu genero favorito:</label>

                        <select
                          onChange={handlefavMusicgenre}
                          value={favMusicgenre}
                        >
                          <option value="rock">Rock</option>
                          <option value="pop">Pop</option>
                          <option value="rap">Rap</option>
                          <option value="electronica">Electronica</option>
                          <option value="idependiente">Independiente</option>
                          <option value="clasica">Clasica</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center pt-3">
                      <button
                        onClick={onSubmit}
                        type="submit "
                        id="buttonRegister liveAlertBtn"
                        className="btn btn-warning btn-lg ms-2 rounded-pill"
                      >
                        Registrarme
                      </button>
                    </div>
                    <div className="mb-3 form-check mt-3 d-flex justify-content-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <div className="form-check-label ms-3 ">
                        He leido y acepto las
                        <Link to="/privacy" className="ms-1">
                          politicas de privacidad.
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
