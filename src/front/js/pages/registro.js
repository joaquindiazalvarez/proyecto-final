import React from "react";
import registroimg from "../../img/registroimg.jpg";
import { Link } from "react-router-dom";

export const Registro = () => {
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
                            type="text"
                            id="form3Example8"
                            className="form-control form-control-lg"
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
                            type="text"
                            id="form3Example1n"
                            className="form-control form-control-lg"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Crea una contraseña</label>
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                      />
                    </div>

                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Genero: </h6>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="femaleGender"
                          value="option1"
                        />
                        <label className="form-check-label">Mujer</label>
                      </div>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="maleGender"
                          value="option2"
                        />
                        <label className="form-check-label">Hombre</label>
                      </div>

                      <div className="form-check form-check-inline mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="otherGender"
                          value="option3"
                        />
                        <label className="form-check-label">No binario</label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <form>
                        <label>Ingrese fecha de nacimiento:</label>
                        <input type="date" name="birthday" />
                      </form>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="col-md-6 mb-4">
                        <label>Selecciona tu genero favorito:</label>

                        <select>
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
                        type="button"
                        id="buttonRegister"
                        className="btn btn-warning btn-lg ms-2 rounded-pill"
                      >
                        Registarme
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
