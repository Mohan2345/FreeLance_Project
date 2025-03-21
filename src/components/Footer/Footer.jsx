import React from "react";
import "./Footer.css";
import logo from "../../Aseets/finallogo.png";  
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();  

  const menPage = () => {
    navigate("/mens");  
  };

  const womenPage = () => {
    navigate("/womens");
  }

  return (
    <>
      <div className="container-fluid">
        <footer className="bg-custom text-center text-lg-start text-white">
          <div className="container p-4">
            <div className="row my-4">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <div
                  className="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto"
                  style={{
                    width: "150px",
                    height: "150px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "280px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
                <p className="text-center">
                  Homeless animal shelter The budgetary unit of the Capital City
                  of Warsaw
                </p>
                <ul className="list-unstyled d-flex flex-row justify-content-center">
                  <li>
                    <a className="text-white px-2" href="#!">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-white px-2" href="#!">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-white ps-2" href="#!">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">About Us</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#!" className="text-white">
                      <i className="fas fa-shopping-bag pe-3"></i>Services
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#!" className="text-white">
                      <i className="fas fa-shopping-bag pe-3"></i>Privacy policy
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#!" className="text-white">
                      <i className="fas fa-shopping-bag pe-3"></i>FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Categories</h5>
                <ul className="list-unstyled cursor-pointer">
                  <li className="mb-2">
                    <a className="text-white" onClick={menPage}>
                      <i className="fas fa-shopping-bag pe-3"></i> Men's Fashion
                    </a>
                  </li>
                  <li className="mb-2">
                    <a className="text-white" onClick={womenPage}>
                      <i className="fas fa-shopping-bag pe-3"></i> Women's
                      Fashion
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ">
                <h5 className="text-uppercase mb-4">Contact</h5>
                <ul className="list-unstyled">
                  <li>
                    <p style={{ display: "flex", alignItems: "space-between" }}>
                      <i
                        className="fas fa-map-marker-alt pe-2"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Plot No-1641/1989, Uttara, Pubasasan, Kausalyaganga,
                      Khordha, Bhubaneswar, Odisha, India, 751002
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone pe-2"></i>+ 91 8847816118
                    </p>
                  </li>
                  <li>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="fas fa-envelope pe-2 mb-0"
                        style={{ marginRight: "8px" }}
                      ></i>
                      kohlhandcraftedfashiondesigner@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2020 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">
              MDBootstrap.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
