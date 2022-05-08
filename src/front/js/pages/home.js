import React from "react";
import rock from "../../img/rock.jpg";
import festival from "../../img/festival.jpg";
import publico from "../../img/publico.jpeg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
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
            <img src={rock} className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h2>
                ¿ESTAS BUSCANDO BANDAS, MUSICOS O TIENES ALGUN PROYECTO EN
                MENTE?
              </h2>
              <Link to="/registro" className="btn  BotonColor" type="button">
                Registrate
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src={festival} className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h2>AQUI PODRAS PATROCINAR BANDAS Y ARTISTAS EMERGENTES</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img src={publico} className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
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
      <div className="card-group" id="cards">
        <div className="card">
          <img src="..." className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Artista</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
        <div className="card">
          <img src="..." className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
        </div>
        <div className="card">
          <img src="..." className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
