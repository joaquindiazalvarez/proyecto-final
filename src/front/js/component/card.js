import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = (props) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    const name = props.name;
    actions.getProfileByName(props.name);
    console.log("mi console log", store.profile);
  }, []);
  return (
    <div className="card" key={props.index}>
      <Link
        to={"/profile/" + store.profile.name}
        style={{ textDecoration: "none" }}
      >
        <img src={store.profile.photo} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{store.profile.name}</h5>
        </div>
      </Link>
    </div>
  );
};
