import React from "react";
import { Link } from "react-router-dom";

export const Card_for_home = (props) => {
  return (
    <div>
      <Link to={"/profile/" + props.name} style={{ textDecoration: "none" }}>
        <img src={props.photo} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
        </div>
      </Link>
    </div>
  );
};
