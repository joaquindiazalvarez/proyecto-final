import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card.js";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getAllFavorites();
  }, []);
  return (
    <div>
      <h1>Favoritos</h1>
      <div className="container">
        <div className="row">
          <div className="col-3">
            {store.favorites["favorites_list"]?.map((value, index) => {
              console.log("holaaa");
              return <Card index={index} name={value.name} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
