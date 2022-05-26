import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contact = (props) => {
  const { store, actions } = useContext(Context);
  const [editContact, setEditContact] = useState(false);
  const [media, setMedia] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
  });
  useEffect(() => {
    actions.getContactByProfileName(props.name);
  }, []);
  const onChangeFacebook = (e) => {
    setMedia({ ...media, facebook: e.target.value });
  };
  const onChangeInstagram = (e) => {
    setMedia({ ...media, instagram: e.target.value });
  };
  const onChangeYoutube = (e) => {
    setMedia({ ...media, youtube: e.target.value });
  };
  const handleSubmit = (e) => {
    actions
      .updateContact(media)
      .then(() => actions.getContactByProfileName(props.name));
    setEditContact(false);
  };
  return (
    <div className="colt text-start">
      <div className="editContact d-flex">
        <h5 className="pt-2 ms-3">Contacto</h5>
        {props.edit && !editContact && (
          <button
            type="button"
            className="btn"
            onClick={() => setEditContact(true)}
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
        {props.edit && editContact && (
          <button type="button" className="btn" onClick={() => handleSubmit()}>
            Aceptar
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
      {!props.edit && !editContact && (
        <div>
          {store.profile_public_contact_list.map((value, i) => {
            return (
              <div className="contactdisplay" key={i}>
                {value.type === "facebook" && value.value != "" && (
                  <div>
                    <i className="fab fa-facebook-f me-2"></i>
                    {value.value}
                  </div>
                )}
                {value.type === "instagram" && value.value != "" && (
                  <div>
                    <i className="fab fa-instagram me-2"></i>
                    {value.value}
                  </div>
                )}
                {value.type === "youtube" && value.value != "" && (
                  <div>
                    <i className="fab fa-youtube me-2"></i>
                    {value.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {props.edit && !editContact && (
        <div>
          {store.profile_public_contact_list.map((value, i) => {
            return (
              <div className="contactdisplay" key={i}>
                {value.type === "facebook" && value.value != "" && (
                  <div>
                    <i className="fab fa-facebook-f me-2"></i>
                    {value.value}
                  </div>
                )}
                {value.type === "instagram" && value.value != "" && (
                  <div>
                    <i className="fab fa-instagram me-2"></i>
                    {value.value}
                  </div>
                )}
                {value.type === "youtube" && value.value != "" && (
                  <div>
                    <i className="fab fa-youtube me-2"></i>
                    {value.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {props.edit && editContact && (
        <div>
          {store.profile_public_contact_list.map((value, i) => {
            return (
              <div>
                {value.type === "facebook" && (
                  <div className="d-flex">
                    <i className="fab fa-facebook-f me-2 pt-2"></i>
                    <input
                      className="form-control"
                      style={{ width: "70px" }}
                      onChange={onChangeFacebook}
                      type="text"
                      //value={media.facebook || value.value}
                    ></input>
                  </div>
                )}
                {value.type === "facebook" && (
                  <div className="d-flex">
                    <i className="fab fa-instagram me-2 pt-2"></i>
                    <input
                      className="form-control"
                      style={{ width: "70px" }}
                      onChange={onChangeInstagram}
                      type="text"
                      //value={media.instagram || value.value}
                    ></input>
                  </div>
                )}
                {value.type === "facebook" && (
                  <div className="d-flex">
                    <i className="fab fa-youtube me-2 pt-2"></i>
                    <input
                      className="form-control"
                      style={{ width: "70px" }}
                      onChange={onChangeYoutube}
                      type="text"
                      //value={media.facebook || value.value}
                    ></input>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
