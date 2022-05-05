import React, { Component } from "react";

export const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-black text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Estas son nuestras redes sociales:</span>
        </div>
        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>BandFolio
              </h6>
              <p>Un espacio creado para compartir musica.</p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Bandas
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Artistas
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Mi Perfil
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Acerca de nosotros
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contactos</h6>
              <p>
                <i className="fas fa-home me-3"></i>Santiago, Region
                Metropolitna, Chile.
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                contacto@bandfolio.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 56 983 45 56
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 56 987 45 56
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4">
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="...">
          Bandfolio.com
        </a>
      </div>
    </footer>
  );
};
