import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
// store user info
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = {email:email,password:password};

//with this we collect the user info
    const handleEmail = (e) => {setEmail(e.target.value);
    }
    const handlePassword = (e)=> {setPassword(e.target.value); 
    }   
    const handleSubmit = (e) => {actions.postLogin(user),e.preventDefault();}
        

    //messages succes and error

    return(
        <div className="bg-light">
            
            <form className="container bg-light w-50" >
            <h1 className="d-flex justify-content-center">Log in</h1>
            <span className="d-flex justify-content-center">Don't have an account?
			<p>Sign up</p>
			</span>
            <div className="row mb-3 container">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" onChange={handleEmail} value={email}/>
                </div>
            </div>
            <div className="row mb-3 container">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" onChange={handlePassword} value={password}/>
                </div>
            </div>
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mb-2 " onClick={handleSubmit}>Log  in</button>
            </div>
            </form>
        </div>
    )
} 