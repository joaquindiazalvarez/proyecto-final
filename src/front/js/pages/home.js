import React, { useEffect, useContext, useState } from "react";
import rock from "../../img/rock.jpg";
import festival from "../../img/festival.jpg";
import publico from "../../img/publico.jpeg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card_for_home } from "../component/card_for_home";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [array, setArray] = useState([]);
  function getArrayOfProfiles() {
    var arr = [];
    for (let i = 0; i < store.populated.length; i++) {
      actions.getProfilesByGenre(store.populated[i]).then(() => {
        arr.push(store.profile_by_genre);
      });
    }
    return arr;
  }
  useEffect(() => {
    actions.getPhotosProfile();
    actions.getPopulated().then(() => {
      console.log(store.populated_genres);
    });
  }, []);

  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={rock} className="d-block w-100 imgCarousel" />
            <div className="carousel-caption d-none d-md-block">
              <h2>
                ¿ESTAS BUSCANDO BANDAS, MUSICOS O TIENES ALGUN PROYECTO EN
                MENTE?
              </h2>
              <Link to="/register" className="btn  BotonColor" type="button">
                Registrate
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src={festival} className="d-block w-100 imgCarousel" />
            <div className="carousel-caption d-none d-md-block">
              <h2>AQUI PODRAS PATROCINAR BANDAS Y ARTISTAS EMERGENTES</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img src={publico} className="d-block w-100 imgCarousel" />
            <div className="carousel-caption d-none d-md-block">
              <h2>SIGUE A TUS ARTISTAS FAVORITOS</h2>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />

      <h3 className="ms-4 text-center">Artistas Nuevos</h3>
      <div className="cards">
        <div className="card-group ">
          {store.profile.length > 0 &&
            store.profile.map((profile, i) => (
              <div className="card" key={i}>
                <Card_for_home name={profile.name} photo={profile.photo} />
              </div>
            ))}
        </div>
      </div>
      {store.populated_genres.length > 0 &&
        store.populated_genres.map((genre, i) => {
          return (
            <div>
              <h3 className="ms-4 text-center" key={i}>
                {genre.genre}
              </h3>
              <div className="cards">
                <div className="card-group">
                  {genre.profiles_array.map((profile, j) => {
                    return (
                      <div className="card2" key={j}>
                        <Card_for_home
                          name={profile.profile_name}
                          photo={profile.profile_photo}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
