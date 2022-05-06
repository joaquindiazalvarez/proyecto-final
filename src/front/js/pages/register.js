import React from "react";

export const Register = () => {
  return (
    <div className="text-center">
      <h2 className="mt-4">Registrate</h2>
      <hr />
      <br />
      <p>
        Únete a nuestra red de músicos TOTALMENTE GRATIS y ayúdanos a promover a
        los músicos y las bandas en todos los lugares.
      </p>

      <form className="text-start ms-5">
        <div className="mb-3 py-5">
          <h4>Como quieres que te llamemos?</h4>
          <br />
          <input
            for="exampleInputEmail1"
            className="form-label"
            placeholder="Ingrese un usuario"
          />
          <h4 className="mt-3 ">Cual es tu correo electronico?</h4>
          <br />
          <input
            for="exampleInputEmail1"
            className="form-label"
            placeholder="Ingresa tu correo"
          />
          <div id="emailHelp" className="form-text">
            Nunca compartiremos tu correo con un tercero.
          </div>

          <h4 className="mt-3">Crea una contrasena</h4>
          <br />
          <input
            for="exampleInputEmail1"
            className="form-label"
            placeholder="Contrasena"
          />

          <div id="emailHelp" className="form-text">
            Crea una contrasena alfanumerica
          </div>

          <h4 className="mt-3">Cual es tu genero?</h4>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />
            <label className="form-check-label" for="inlineRadio1">
              Hombre
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label className="form-check-label" for="inlineRadio2">
              Mujer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label className="form-check-label" for="inlineRadio2">
              No Binario
            </label>
          </div>

          <h4 className="mt-3">Cual es tu fecha de nacimiento</h4>
          <form>
            <label>Seleccione la fecha:</label>
            <input type="date" name="birthday" />
          </form>

          <div className="mb-3 form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label " for="exampleCheck1">
              He leido y acepto las politicas de privacidad
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarme
          </button>
        </div>
      </form>
    </div>
  );
};
