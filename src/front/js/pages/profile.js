import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const [deafult, setDeafult] = useState(store.profile);
  const [editStatus, setEditStatus] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editSoundCloud, setEditSoundCloud] = useState(false);

  const onChangePhoto = (e) => {
    setDeafult({ ...deafult, photo: e.target.value });
  };
  const onChangeName = (e) => {
    setDeafult({ ...deafult, name: e.target.value });
  };
  const onChangeDescription = (e) => {
    setDeafult({ ...deafult, description: e.target.value });
  };
  const onChangeStatus = (e) => {
    setDeafult({ ...deafult, post: e.target.value });
  };
  const onChangeSoundcloud = (e) => {
    setDeafult({ ...deafult, soundcloud: e.target.value });
  };
  const handleSubmit = (e) => {
    actions.updateProfile(deafult),
      {
        /*e.preventDefault()*/
      };
  };
  useEffect(() => {
    actions.getProfileByName(params.name);
    setDeafult({ ...deafult, name: params.name });
    console.log("miparams", params);
  }, [
    params.name,
    editDescription,
    editPhoto,
    editSoundCloud,
    editName,
    editStatus,
  ]);
  return (
    <div className="d-flex justify-content-center">
      <div className="row w-75 bg-light">
        <div>
          <div className="">
            <div className="bg-light" style={{ maxwidth: "1090px" }}>
              <div className="row container g-0">
                <div
                  class="col-md-4 p-0 d-flex justify-content-center align-items-center"
                  style={{ maxHeight: "300px" }}
                >
                  {/* profile photo if edit = false----------------------------------------------*/}
                  {!editPhoto && (
                    <div className="divimage">
                      <img
                        src={store.profile.photo}
                        className="profilePhoto"
                      ></img>
                    </div>
                  )}
                  {editPhoto && (
                    <div className="col text">
                      <h6>URL de tu foto</h6>
                      <input
                        type="text"
                        value={deafult.photo || store.profile.photo}
                        onChange={(e) => onChangePhoto(e)}
                      ></input>
                    </div>
                  )}
                  {store.user_profile.name && (
                    <div className="divbutton">
                      {!editPhoto && (
                        <button
                          type="button"
                          className="btn"
                          onClick={() => setEditPhoto(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                          </svg>
                        </button>
                      )}
                      {editPhoto && (
                        <button
                          type="button"
                          className="btn"
                          onClick={() => {
                            setEditPhoto(false);
                            handleSubmit();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {/* profile name ---------------------------*/}
                    <div>
                      {!editName && (
                        <h1 className="card-title">{store.profile["name"]}</h1>
                      )}
                      {editName && (
                        <div className="row text-center p-5">
                          <div className="col pt-2">
                            <input
                              type="text"
                              value={deafult.name || store.profile["name"]}
                              onChange={(e) => onChangeName(e)}
                            ></input>
                          </div>
                        </div>
                      )}
                      {store.user_profile.name && (
                        <div className="">
                          {!editName && (
                            <button
                              type="button"
                              className="btn"
                              onClick={() => setEditName(true)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                              </svg>
                            </button>
                          )}
                          {editName && (
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                setEditName(false);
                                handleSubmit();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                      {/*description-----------------------------------------------------------*/}
                      {!editDescription && (
                        <div className="row">
                          <div className="col text-center p-4 m-3">
                            {store.profile.description}
                          </div>
                        </div>
                      )}
                      {editDescription && (
                        <div className="row">
                          <div className="col text-center">
                            <h5>Editar descripcion</h5>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows={5}
                              type="text"
                              value={
                                deafult.description || store.profile.description
                              }
                              onChange={(e) => onChangeDescription(e)}
                            ></textarea>
                          </div>
                          <div className="col-4"></div>
                        </div>
                      )}
                      {store.user_profile.name && (
                        <div className="">
                          {!editDescription && (
                            <button
                              type="button"
                              className="btn"
                              onClick={() => setEditDescription(true)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                              </svg>
                            </button>
                          )}
                          {editDescription && (
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                setEditDescription(false);
                                handleSubmit();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/*donate button----------------------------------------------------*/}
              <div className="col-2 text-center ms-1">
                <button className="btn btnDonate col-12">Donate</button>
              </div>
              {/*add to favorites button---------------------------------------*/}
              <div className="col-1 text-center">
                <button className="btn btnFollow">Follow</button>
              </div>
              {/*StatusButton and input---------------------------------------*/}
              {store.user_profile.name && (
                <div className="ms-5 col-1">
                  {!edit && (
                    <button
                      type="button"
                      className="btn btnStatus mx-1 col-12"
                      onClick={() => setEditStatus(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-activity"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                        />
                      </svg>
                    </button>
                  )}
                  {edit && (
                    <button
                      type="button"
                      className="btn btnStatus mx-1 col-12"
                      onClick={() => {
                        setEditStatus(false);
                        handleSubmit();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-activity"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              <input
                type="text"
                className="input-group-sm mb-3 form-control col me-4"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={deafult.soundcloud || store.profile.soundcloud}
                onChange={(e) => onChangeStatus(e)}
              />
            </div>

            {/*Soundcloud player-----------------------------------------------*/}
            {!editSoundCloud && (
              <div className="row">
                <div className="player-wrapper col d-flex justify-content-end p-4 ">
                  <ReactPlayer
                    width="50%"
                    height="60%"
                    url={store.profile.soundcloud}
                  />
                </div>
              </div>
            )}
            {editSoundCloud && (
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
            )}
            {store.user_profile.name && (
              <div className="">
                {!editSoundCloud && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setEditSoundCloud(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-disc-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z" />
                    </svg>
                  </button>
                )}
                {editSoundCloud && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setEditSoundCloud(false);
                      handleSubmit();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-disc-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
