 // components/Header.js
"use client";

import { useState } from "react";
import "./Navbar.css";
import logo from "../../Aseets/logo.png";
import { Navbar, Container, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import WishlistSidebar from "../WishSidebar/WishlistSidebar";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  const menPage = () => navigate("/mens");
  const womenPage = () => navigate("/womens");
  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);
  const handleCartRedirect = () => navigate("/cart");

  const handleMenuSelect = (eventKey) => {
    setShowDropdown(false); // Close dropdown after selection
    switch (eventKey) {
      case "login": navigate("/login"); break;
      case "orders": navigate("/my-orders"); break;
      case "track": navigate("/track-order"); break;
      case "contact": navigate("/contact"); break;
      default: break;
    }
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
            </Nav>
            <Form className="d-flex c-search mb-3 mb-lg-0 me-lg-3">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Nav className="align-items-center">
              <Nav.Link href="#" className="position-relative me-3" onClick={toggleWishlist}>
                <i className="bi bi-heart" style={{ fontSize: "18px" }}></i>
              </Nav.Link>
              <Nav.Link className="position-relative me-3" onClick={handleCartRedirect} style={{ cursor: "pointer" }}>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ left: "-10px", top: "-10px" }}
                >
                  {getCartCount()}
                </span>
                <i className="bi bi-bag-fill" style={{ fontSize: "18px" }}></i>
              </Nav.Link>
              <NavDropdown
                title={<i className="bi bi-person-fill" style={{ fontSize: "20px" }}></i>}
                id="user-dropdown"
                align="end"
                className="custom-dropdown"
                onSelect={handleMenuSelect}
                show={showDropdown}
                onToggle={(isOpen) => setShowDropdown(isOpen)} // Control dropdown toggle
              >
                <NavDropdown.Item eventKey="login" className="py-2">
                  Login / Register
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="orders" className="py-2">
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="track" className="py-2">
                  Track My Order
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="contact" className="py-2">
                  Contact
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};

export default Header;