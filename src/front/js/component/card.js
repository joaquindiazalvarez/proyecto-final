import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = (props) => {
  const { store, actions } = useContext(Context);
  const handleDelete = () => {
    actions
      .deleteFromFavorites(props.name)
      .then(() => actions.getAllFavorites());
    console.log(props.name);
  };
  useEffect(() => {
    actions.getAllFavorites();
  }, []);

  return (
    <div className="card" key={props.index}>
      <Link to={"/profile/" + props.name} style={{ textDecoration: "none" }}>
        <img
          src={store.favorites.favorites_list[props.index].photo}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
        </div>
      </Link>
      <button type="button" className="btn BotonDelete" onClick={handleDelete}>
        Quitar de Favoritos
      </button>
    </div>
  );
};
