import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Genre = (props) => {
  const { store, actions } = useContext(Context);
  const [editGenres, setEditGenres] = useState(false);
  const [add, setAdd] = useState("");
  useEffect(() => {
    actions.getGenresByProfileName(props.name);
    actions
      .getAllDeafultGenres()
      .then(() =>
        console.log("miarray de genreos deafult", store.deafult_genres_list)
      );
  }, []);
  const onChangeAdd = (e) => {
    setAdd(e.target.value);
  };
  const handleSubmit = () => {
    actions
      .addGenresToProfile([add])
      .then(() => actions.getGenresByProfileName(props.name));
  };
  const handleDelete = (e) => {
    actions
      .deleteGenreFromProfile(e)
      .then(() => actions.getGenresByProfileName(props.name));
    //.then(() => window.location.reload(false));
  };

  return (
    <div className="col text-start ms-3">
      <div className="editGenres d-flex ">
        <h5 className="pt-2">Géneros</h5>
        {props.edit && !editGenres && (
          <button
            type="button"
            className="btn"
            onClick={() => setEditGenres(true)}
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
        {props.edit && editGenres && (
          <button
            type="button"
            className="btn"
            onClick={() => setEditGenres(false)}
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
      {!props.edit && !editGenres && (
        <>
          {store.profile_genres_list.map((value, i) => {
            return (
              <div key={i} className="genre my-3">
                <span className="text-start">{value}</span>
              </div>
            );
          })}
        </>
      )}
      {props.edit && !editGenres && (
        <div>
          {store.profile_genres_list.map((value, i) => {
            return (
              <div key={i} className="genre my-3">
                <span className="text-start">{value}</span>
              </div>
            );
          })}
        </div>
      )}
      {props.edit && editGenres && (
        <div className="col edit">
          {store.profile_genres_list.map((value, i) => {
            return (
              <div className="genre my-3">
                <span className="text-start">
                  {value}
                  <span className="nostyle" onClick={() => handleDelete(value)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            );
          })}
          <div className="input-group">
            <input
              className="form-control"
              style={{ width: "70px" }}
              onChange={onChangeAdd}
              type="text"
            ></input>
            <button
              type="button"
              className="btn btnDonate"
              onClick={handleSubmit}
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
