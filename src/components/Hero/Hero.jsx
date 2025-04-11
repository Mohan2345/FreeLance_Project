import React from "react"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
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
              <div className="carousel-image-container">
                <img
                  src="https://kavana.in/cdn/shop/files/DSCF6638_f32d9833-0d52-45e2-8256-7a219d7799f7.jpg?v=1738058729&width=2000"
                  className="d-block w-100 carousel-image"
                  alt="First slide image"
                />
                <div className="carousel-caption">
                  <div className="caption-content">
                    <h1 className="display-4 fw-bold mb-4">Welcome to Our Site</h1>
                    <p className="lead">Discover amazing features and services.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src="https://kavana.in/cdn/shop/files/kavana12816.jpg?v=1730031602&width=2000"
                  className="d-block w-100 carousel-image"
                  alt="Second slide image"
                />
                <div className="carousel-caption">
                  <div className="caption-content">
                    <h1 className="display-4 fw-bold mb-4">Explore Our Products</h1>
                    <p className="lead">Find the perfect solution for your needs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src="https://kavana.in/cdn/shop/files/Untitled_design_1_b9f0a5f2-847c-44a2-b41d-029d298ddace.png?v=1708711887&width=1800"
                  className="d-block w-100 carousel-image"
                  alt="Third slide image"
                />
                <div className="carousel-caption">
                  <div className="caption-content">
                    <h1 className="display-4 fw-bold mb-4">Join Our Community</h1>
                    <p className="lead">Connect with like-minded individuals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

