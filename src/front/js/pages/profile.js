import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  useEffect(() => {
    actions.getUserByName(params);
  }, [params.name]);
  return (
    <div>
      {/* profile name */}
      <div className="row text-center p-5">
        <div className="col-5 text-end pt-1">
          <i className="far fa-star fa-4x"></i>
        </div>
        <div className="col pt-2">
          <h1>{store.profile["name"]}</h1>
        </div>
        <div className="col-5 text-start pt-1">
          <i className="far fa-star fa-4x"></i>
        </div>
      </div>
      {/* profile photo */}
      <div className="row">
        <div className="col text-center">
          <img src={store.profile.photo} alt="profile-photo"></img>
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col text-center p-4">{store.profile.description}</div>
        <div className="col-4"></div>
      </div>
      {/*add to favorites button*/}
      <div className="row">
        <div className="col text-center">
          <button className="btn btn-outline-success" type="button">
            Agregar a Favoritos
          </button>
        </div>
      </div>
      {/*Soundcloud player*/}
      <div className="row">
        <div className="col d-flex justify-content-center p-4">
          <ReactPlayer url={store.profile.soundcloud} />
        </div>
      </div>
      {/*donate button*/}
      <div className="row mb-5">
        <div className="col text-center">
          <button className="btn btn-outline-success" type="button">
            Donar
          </button>
        </div>
      </div>
    </div>
  );
};
