"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../Aseets/finallogo.png";
import { Navbar, Container, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import WishlistSidebar from "../WishSidebar/WishlistSidebar";
import Data from "../../Data";
import WomenData from "../../WomenData";
import { useAuth } from "../../AuthContext"; // Import the useAuth hook

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { isAuthenticated, logout } = useAuth(); // Destructure isAuthenticated and logout from useAuth

  const allProducts = [...Data.products, ...WomenData.products];

  const menPage = () => navigate("/mens");
  const womenPage = () => navigate("/womens");
  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);
  const handleCartRedirect = () => navigate("/cart");
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || categoryMatch;
    });

    setSearchResults(filteredResults);
  }, [searchQuery]);

  const handleMenuSelect = (eventKey) => {
    setShowDropdown(false);
    switch (eventKey) {
      case "login": navigate("/login"); break;
      case "orders": navigate("/my-orders"); break;
      case "track": navigate("/track-order"); break;
      case "contact": navigate("/contact"); break;
      case "logout":
        handleLogout();
        break;
      default: break;
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://82.29.164.13:8001/api/auth/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        logout(); // Call logout from useAuth
        alert("Logged out successfully.");
        navigate("/login");
      } else {
        alert("Failed to logout.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      toggleSearch();
    }
  };

  const handleSuggestionClick = (productId, productCategory) => {
    const isMensProduct = Data.products.some(p => p.id === productId);

    if (isMensProduct) {
      navigate(`/product/${productId}`);
    } else {
      navigate(`/product/${productId}`);
    }

    toggleSearch();
  };

  const handleNavLinkClick = (route) => {
    setShowDropdown(false);

    const navToggle = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    if (navCollapse.classList.contains('show')) {
      navToggle.click();
    }

    navigate(route);
  };

  return (
    <>
      <Navbar className="navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" expand="lg">
        <Container>
          {/* Mobile Icons div that stays visible outside toggle */}
          <div className="d-flex d-lg-none mobile-icons-container">
            <Nav.Link href="#" onClick={toggleSearch} className="mobile-icon">
              <i className="bi bi-search" style={{ fontSize: "18px" }}></i>
            </Nav.Link>
            <Nav.Link href="#" onClick={toggleWishlist} className="position-relative mobile-icon">
              <i className="bi bi-heart" style={{ fontSize: "18px" }}></i>
            </Nav.Link>
            <Nav.Link onClick={handleCartRedirect} className="position-relative mobile-icon">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "10px", padding: "2px 5px" }}>
                {getCartCount()}
              </span>
              <i className="bi bi-bag-fill" style={{ fontSize: "18px" }}></i>
            </Nav.Link>
            <NavDropdown
              title={<i className="bi bi-person-fill" style={{ fontSize: "20px" }}></i>}
              id="user-dropdown-mobile"
              align="end"
              className="custom-dropdown mobile-icon"
              onSelect={handleMenuSelect}
              show={showDropdown}
              onToggle={(isOpen) => setShowDropdown(isOpen)}
            >
              {!isAuthenticated ? (
                <NavDropdown.Item eventKey="login" className="py-2">Login / Register</NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item eventKey="orders" className="py-2">My Orders</NavDropdown.Item>
                  <NavDropdown.Item eventKey="track" className="py-2">Track My Order</NavDropdown.Item>
                  <NavDropdown.Item eventKey="contact" className="py-2">Contact</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="logout" className="py-2 text-danger">Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </div>

          {/* Logo - centered on mobile */}
          <Navbar.Brand href="#" className="py-0 navbar-logo" onClick={() => navigate("/")}>
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link className="fw-bold mb-2 mb-lg-0" onClick={() => handleNavLinkClick("/")}>HOME</Nav.Link>
              <Nav.Link className="fw-bold mb-2 mb-lg-0" onClick={() => handleNavLinkClick("/mens")}>MEN'S</Nav.Link>
              <Nav.Link className="fw-bold mb-2 mb-lg-0" onClick={() => handleNavLinkClick("/womens")}>WOMEN'S</Nav.Link>
            </Nav>

            {/* Desktop icons - only visible on lg screens */}
            <Nav className="d-none d-lg-flex align-items-center">
              <Nav.Link href="#" className="me-3" onClick={toggleSearch}>
                <i className="bi bi-search" style={{ fontSize: "18px" }}></i>
              </Nav.Link>
              <Nav.Link href="#" className="position-relative me-3" onClick={toggleWishlist}>
                <i className="bi bi-heart" style={{ fontSize: "18px" }}></i>
              </Nav.Link>
              <Nav.Link className="position-relative me-3" onClick={handleCartRedirect}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ left: "-10px", top: "-10px" }}>
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
                onToggle={(isOpen) => setShowDropdown(isOpen)}
              >
                {!isAuthenticated ? (
                  <NavDropdown.Item eventKey="login" className="py-2">Login / Register</NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item eventKey="orders" className="py-2">My Orders</NavDropdown.Item>
                    <NavDropdown.Item eventKey="track" className="py-2">Track My Order</NavDropdown.Item>
                    <NavDropdown.Item eventKey="contact" className="py-2">Contact</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="logout" className="py-2 text-danger">Logout</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSearch && (
        <div className="search-overlay" onClick={toggleSearch}>
          <div className="search-overlay-content" onClick={(e) => e.stopPropagation()}>
            <Form className="d-flex search-form" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search for products..."
                className="search-input"
                aria-label="Search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="search-button"
              >
                <i className="bi bi-search"></i>
              </Button>
            </Form>

            {searchResults.length > 0 && (
              <div className="search-suggestions">
                {searchResults.map(product => (
                  <div
                    key={product.id}
                    className="search-suggestion-item"
                    onClick={() => handleSuggestionClick(product.id, product.category)}
                  >
                    <div className="suggestion-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="suggestion-info">
                      <div className="suggestion-name">{product.name}</div>
                      <div className="suggestion-category">{product.category}</div>
                      <div className="suggestion-price">₹{product.price} <span className="original-price">₹{product.originalPrice}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};

export default Header;
