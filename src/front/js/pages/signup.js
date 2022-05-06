import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [genre, setGenre] = useState("");
    const [favMusicGenre, setFavMusicGenre] = useState("");
    const registerUser = {name:name, email:email, password:password, birthDate:birthDate, genre:genre, favMusicGenre:favMusicGenre}

    const handleName = (e) => {setName(e.target.value)}
    const handleEmail = (e) => {setEmail(e.target.value)}
    const handlePassword = (e) => {setPassword(e.target.value)}
    const handleBirthDate = (e) => {setBirthDate(e.target.value)}
    const handleGenre = (e) => {setGenre(e.target.name)}
    const handlefavMusicGenre = (e) => {setFavMusicGenre(e.target.value)}

    const handleSubmit = (e) => {actions.postRegister(registerUser),e.preventDefault();}
    console.log(registerUser)
    return(
        <form className="container bg-light w-50 row">
            <label>Name</label>
            <input onChange={handleName} value={name}/>
            <label>Email</label>
            <input onChange={handleEmail} value={email}/>
            <label>Password</label>
            <input onChange={handlePassword} value={password}/>
            <label htmlFor="start">DATE OF BIRTH</label>
            <input type="date" id="start" name="trip-start"
                min="1950-01-01" max="2018-12-31" onChange={handleBirthDate} value={birthDate}/>
            <label>Te defines como:</label> 
                <label className="container col-4">Male
                <input type="radio" checked="checked" name="Male" onChange={handleGenre}/>
                <span className="checkmark"></span>
                </label>
                <label className="container col-4">Female
                <input type="radio" name="Female" onChange={handleGenre}/>
                <span className="checkmark"></span>
                </label>
                <label className="container col-4">Not your bussines
                <input type="radio" name="Not your bussines" onChange={handleGenre}/>
                <span className="checkmark"></span>
                </label>
            <label>Favorite music genres </label>
            <select onChange={handlefavMusicGenre} value={favMusicGenre}>
                <option value="METAL">METAL</option>
                <option value="ROCK">ROCK</option>
                <option value="POP">POP</option>
                <option value="ELECTRONICA">ELECTRONICA</option>
            </select>
            <label>No soy un robot</label>
            <label className="container">Not a Robot
                <input type="checkbox"/>
                <span className="checkmark"></span>
                </label>
            <button onClick={handleSubmit} >Register</button>

        </form>
    )
} 