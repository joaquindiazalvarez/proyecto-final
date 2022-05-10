import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";


export const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setBirthDate] = useState("");
  const [gender, setgender] = useState("");
  const [favMusicgenre, setFavMusicgenre] = useState("");
  const registerUser = {name:name, email:email, password:password, date_of_birth:date_of_birth, gender:gender, favMusicgenre:favMusicgenre}

  const handleName = (e) => {setName(e.target.value)}
  const handleEmail = (e) => {setEmail(e.target.value)}
  const handlePassword = (e) => {setPassword(e.target.value)}
  const handleBirthDate = (e) => {setBirthDate(e.target.value)}
  const handlegender = (e) => {setgender(e.target.value)}
  const handlefavMusicgenre = (e) => {setFavMusicgenre(e.target.value)}
  console.log(registerUser)

  const regexname = /^[ \a-zA-Z0-9]+$/;
  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexpassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/
  const testname = regexname.test(name)
  const testemail = regexemail.test(email)
  const testpassword = regexpassword.test(password)

  const handleSubmit = (e) => {actions.postRegister(registerUser),e.preventDefault();}
  const preventDef = (e) => {e.preventDefault();}
  //
  let colorName = ""
  if (testname == true) {
    colorName = "border border-success"
  }
    else
    colorName = "border border-danger"
  //  
  let colorEmail = ""
  if (testemail == true) {
    colorEmail = "border border-success"
  }
  else
    colorEmail = "border border-danger"
  //  
  let colorPassword = ""
  if (testpassword == true) {
    colorPassword = "border border-success"
  }
  else
    colorPassword = "border border-danger"  

  const onSubmit = (a,b) => {
    if (testname == true && testemail == true && testpassword == true){
      handleSubmit(a,b)

    }
    else
      preventDef(a)


  }
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
          <input onChange={handleName} value={name}
            id="name"
            for="exampleInputEmail1"
            className={colorName}
            placeholder="Ingrese un usuario"
          />
          <h4 className="mt-3 ">Cual es tu correo electronico?</h4>
          <br />
          <input onChange={handleEmail} value={email}
            id="email"
            for="exampleInputEmail1"
            className={colorEmail}
            placeholder="Ingresa tu correo"
          />
          <div id="emailHelp" className="form-text">
            Nunca compartiremos tu correo con un tercero.
          </div>

          <h4 className="mt-3">Crea una contrasena</h4>
          <br />
          <input
          id="password"
           onChange={handlePassword} value={password}
            for="exampleInputEmail1"
            className={colorPassword}
            placeholder="Contrasena"
          />

          <div id="emailHelp" className="form-text">
            Tu contraseña debe ser alfanumerica, contener una Mayuscula, una minuscula, un (!@#$%^&*) y ser de almenos 8 caracteres.
          </div>

          <h4 className="mt-3">Cual es tu genero?</h4>
          <div className="form-check form-check-inline">
            <input onChange={handlegender}
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="Male"
            />
            <label className="form-check-label" for="inlineRadio1">
              Hombre
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input onChange={handlegender}
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Female"
            />
            <label className="form-check-label" for="inlineRadio2">
              Mujer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input onChange={handlegender}
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Other"
            />
            <label className="form-check-label" for="inlineRadio2">
              No Binario
            </label>
          </div>

          <h4 className="mt-3">Cual es tu fecha de nacimiento</h4>
          <form>
            <label>Seleccione la fecha:</label>
            <input type="date" name="birthday" onChange={handleBirthDate} value={date_of_birth} />
          </form>

          <div className="mb-3 form-check mt-3">
          <div className="form-outline mb-4">
          <div className="col-md-6 mb-4">
          <label>Selecciona tu genero favorito:</label>

          <select onChange={handlefavMusicgenre} value={favMusicgenre}>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="rap">Rap</option>
          <option value="electronica">Electronica</option>
          <option value="idependiente">Independiente</option>
          <option value="clasica">Clasica</option>
          </select>
          </div>
          </div>


            
            <label className="form-check-label " for="exampleCheck1">
              He leido y acepto las politicas de privacidad
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Registrarme
          </button>
        </div>
      </form>
    </div>
  );
};
