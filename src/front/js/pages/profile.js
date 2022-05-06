import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    
    return (
        console.log("soy profile")
    )
} 