import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(store.profile["name"]);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [soundcloud, setSoundcloud] = useState("");
  const editedProfile = {
    old_name: params.name,
    name: name,
    photo: photo,
    description: description,
    soundcloud: soundcloud,
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSoundcloud = (e) => {
    setSoundcloud(e.target.value);
  };
  useEffect(() => {
    actions.getUserByName(params);
  }, [params.name]);
  return (
    <div>
      {store.profile_names.name_list.includes(params.name) && (
        <div className="text-end p-5">
          {!edit && (
            <button
              type="button"
              className="btn-outline-success"
              onClick={() => setEdit(true)}
            >
              Editar perfil
            </button>
          )}
          {edit && (
            <button
              type="button"
              className="btn-outline-success"
              onClick={() => setEdit(false)}
            >
              Guardar cambios
            </button>
          )}
        </div>
      )}
      {/* profile name non editing mode*/}
      {!edit && (
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
      )}
      {/* profile name editing mode*/}
      {edit && (
        <div className="row text-center p-5">
          <div className="col-5 text-end pt-1">
            <i className="far fa-star fa-4x"></i>
          </div>
          <div className="col pt-2">
            <h5>Editar nombre de perfil</h5>
            <input
              type="text"
              deafultValue={store.profile["name"]}
              key={name ? "not loaded" : "loaded"}
              onChange={handleName}
            ></input>
          </div>
          <div className="col-5 text-start pt-1">
            <i className="far fa-star fa-4x"></i>
          </div>
        </div>
      )}
      {/* profile photo if edit = false*/}
      {!edit && (
        <div className="row">
          <div className="col text-center">
            <img src={store.profile.photo} alt="profile-photo"></img>
          </div>
        </div>
      )}
      {/*edit profile photo url*/}
      {edit && (
        <div className="row">
          <div className="col text-center">
            <h5>Editar URL de la foto</h5>
            <input
              type="text"
              value={store.profile.photo}
              onChange={handlePhoto}
            ></input>
          </div>
        </div>
      )}
      {/*description*/}
      {!edit && (
        <div className="row">
          <div className="col-4"></div>
          <div className="col text-center p-4">{store.profile.description}</div>
          <div className="col-4"></div>
        </div>
      )}
      {/*edit description*/}
      {edit && (
        <div className="row">
          <div className="col-4"></div>
          <div className="col text-center p-4">
            <h5>Editar descripcion</h5>
            <input
              type="text"
              value={store.profile.description}
              onChange={handleDescription}
            ></input>
          </div>
          <div className="col-4"></div>
        </div>
      )}
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
