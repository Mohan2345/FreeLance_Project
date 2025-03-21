 // components/Header.js
"use client";

import { useState } from "react";
import "./Navbar.css";
import logo from "../../Aseets/logo.png"; // Ensure this path is correct
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import WishlistSidebar from "../WishSidebar/WishlistSidebar";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
   const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const menPage = () => {
    navigate("/mens");
  };

  const womenPage = () => {
    navigate("/womens");
  };


  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const handleCartRedirect = () => {
    navigate("/cart");
  };

  return (
    <>
      <Navbar className="navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="py-2">
            <img
              src={logo || "/placeholder.svg"}
              width="100"
              onClick={() => navigate("/")}
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link className="fw-bold mb-2 mb-lg-0" onClick={() => navigate("/")}>
                HOME
              </Nav.Link>
              <Nav.Link className="fw-bold mb-2 mb-lg-0" onClick={menPage}>
                MEN'S
              </Nav.Link>
              <Nav.Link className="fw-bold mb-2 mb-lg-0" onClick={womenPage}>
                WOMEN'S
              </Nav.Link>
              <Nav.Link className="fw-bold mb-2 mb-lg-0" href="#action7">
                CONTACT
              </Nav.Link>
            </Nav>
            <Form className="d-flex c-search mb-3 mb-lg-0 me-lg-3">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Nav className="align-items-center">
              <Nav.Link className="fw-bold me-3" onClick={handleLogin}>
                Login / Register
              </Nav.Link>
              <Nav.Link href="#" className="position-relative me-3" onClick={toggleWishlist}>
                <i className="bi bi-heart" style={{ fontSize: "18px" }}></i>
              </Nav.Link>
              <Nav.Link className="position-relative" onClick={handleCartRedirect} style={{ cursor: "pointer" }}>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ left: "-10px", top: "-10px" }}
                >
                  {getCartCount()}
                </span>
                <i className="bi bi-bag-fill ms-n2" style={{ fontSize: "18px" }}></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

       <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};

export default Header;