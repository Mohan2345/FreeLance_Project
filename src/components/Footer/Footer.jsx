import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import logo from "../../Aseets/finallogo.png";

function Footer() {


  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <a href="/">
              <div className="footer-logo">
                <img src={logo} alt="Logo" className="footer-logo-img" />
                <span className="footer-logo-text">NAME</span>
              </div>
            </a>
            <p className="footer-description">
              Homeless animal shelter The budgetary unit of the Capital City of Warsaw.
            </p>
            <div className="footer-social-icons">
              <a href="#" className="footer-icon" target="_blank" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="footer-icon" target="_blank" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="footer-icon" target="_blank" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="footer-icon" target="_blank" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-inside">
              <div className="footer-links-group">
                <h3>ABOUT US</h3>
                <ul>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>

              <div className="footer-links-group">
                <h3>CATEGORIES</h3>
                <ul>
                  <li><a href="#">Men's Fashion</a></li>
                  <li><a href="#">Women's Fashion</a></li>
                </ul>
              </div>

              <div className="footer-links-group">
                <h3>HELP</h3>
                <ul>
                  <li><a href="#">Payments</a></li>
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">Cancellations</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-links-group">
              <h3>CONTACT</h3>
              <ul className="footer-contact-group">
                <li><FontAwesomeIcon icon={faLocationDot} className="footer-contact-icon" /> <a href="#">Plot No-1641/1989, Uttara, Pubasasan, Kausalyaganga, Khordha, Bhubaneswar, Odisha, India, 751002</a></li>
                <li><FontAwesomeIcon icon={faPhone} className="footer-contact-icon" /> <a href="#">+91 8847816118</a></li>
                <li><FontAwesomeIcon icon={faEnvelope} className="footer-contact-icon" /> <a href="mailto:kohlhandcraftedfashiondesigner@gmail.com">kohlhandcraftedfashiondesigner@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
