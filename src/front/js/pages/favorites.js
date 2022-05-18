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
      <h1 className="text-center p-3">Favoritos</h1>
      <div className="container">
        <div className="row">
          {store.favorites["favorites_list"]?.map((value, index) => {
            return (
              <div className="col-4">
                <Card index={index} name={value.name} />
              </div>
            );
          })}
        </div>
        {store.favorites.favorites_list.length == 0 && (
          <div>
            <h2 className="text-center p-3">Aun no tienes favoritos!</h2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
};
