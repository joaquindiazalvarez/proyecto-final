import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editUlrMusic, setEditUrlMusic] = useState(false);  

  useEffect(() => {
    actions.getUserByName(params);
    setDeafult({ ...deafult, name: params.name });
  }, [params.name, edit, editDescription]);
  const [deafult, setDeafult] = useState(store.profile);
  const onChangePhoto = (e) => {
    setDeafult({ ...deafult, photo: e.target.value });
  };
  const onChangeDescription = (e) => {
    setDeafult({ ...deafult, description: e.target.value });
  };
  const onChangeSoundcloud = (e) => {
    setDeafult({ ...deafult, soundcloud: e.target.value });
  };
  const handleSubmit = (e) => {
    actions.updateProfile(deafult), e.preventDefault();
    actions.getUserByName(params);
    console.log("mi console log", deafult);
  };
  return (
    <div>
      {store.profile_names.name_list?.includes(params.name) && (
        <>
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
              onClick={() => {
                setEdit(false);
                handleSubmit();
              } }
            >
              Guardar cambios
            </button>
          )}

        </div>
        <div className="text-end p-5">
            {!editDescription && (
              <button
                type="button"
                className="btn-outline-success"
                onClick={() => setEditDescription(true)}
              >
                Edit descripcion
              </button>
            )}
            {editDescription && (
              <button
                type="button"
                className="btn-outline-success"
                onClick={() => {
                  setEditDescription(false);
                  handleSubmit();
                } }
              >
                Save descripcion
              </button>
            )}

          </div>
          

        </>
        
        
        
      )}
      {/* profile name non editing mode*/}
      {!edit && (
        <div>
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
          {/* profile photo if edit = false*/}
          <div className="row">
            <div className="col text-center">
              <img src={store.profile.photo} className="profilePhoto"></img>
            </div>
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
      )}
      {/* editing mode */}
      {/* profile name editing mode*/}
      {edit && (
        <div>
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
          {/*edit profile photo url*/}
          <div className="row">
            <div className="col text-center">
              <h5>Editar URL de la foto</h5>
              <input
                type="text"
                value={deafult.photo || store.profile.photo}
                onChange={(e) => onChangePhoto(e)}
              ></input>
            </div>
          </div>
          {/*edit description*/}
          <div className="row">
            <div className="col-4"></div>
            <div className="col text-center p-4">
              <h5>Editar descripcion</h5>
              <input
                type="text"
                value={deafult.description || store.profile.description}
                onChange={(e) => onChangeDescription(e)}
              ></input>
            </div>
            <div className="col-4"></div>
          </div>
          <div className="text-end p-5">
            {!editDescription && (
              <button
                type="button"
                className="btn-outline-success"
                onClick={() => setEditDescription(true)}
              >
                Edit descripcion
              </button>
            )}
            {editDescription && (
              <button
                type="button"
                className="btn-outline-success"
                onClick={() => {
                  setEditDescription(false);
                  handleSubmit();
                } }
              >
                Save descripcion
              </button>
            )}
          </div>





          {/*Soundcloud player*/}
          <div className="row">
            <div className="col p-4 text-center">
              <h5>Editar URL de soundcloud</h5>
              <input
                type="text"
                value={deafult.soundcloud || store.profile.soundcloud}
                onChange={(e) => onChangeSoundcloud(e)}
              ></input>
            </div>
          </div>
        </div>
      )}

              {!editDescription && (
                  <div className="row">
              <div className="col-4"></div>
              <div className="col text-center p-4">
                {store.profile.description}
              </div>
              <div className="col-4"></div>
            </div>
              )}

            {editDescription && (
                    <div className="row">
            <div className="col-4"></div>
            <div className="col text-center p-4">
              <h5>Editar descripcion</h5>
              <input
                type="text"
                value={deafult.description || store.profile.description}
                onChange={(e) => onChangeDescription(e)}
              ></input>
            </div>
            <div className="col-4"></div>
          </div>
          )}

    </div>
  );
};
