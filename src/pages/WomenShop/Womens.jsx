import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner"; // Changed import from react-toastify to sonner
import { ChevronLeft, ChevronRight, Heart, Filter, ChevronDown, X, Grid, Grid2X2, Grid3X3 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import WomenData from "../../WomenData";
import "./Womens.css";
import { useReviews } from "../../ReviewContext/ReviewContext";
import { useCart } from "../../CartContext/CartContext";

const products = WomenData.products;
const PRODUCTS_PER_PAGE = 12;

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFull = starValue <= Math.floor(rating);
        const isPartial = starValue === Math.ceil(rating) && rating % 1 !== 0;
        const fillPercentage = isPartial ? (rating % 1) * 100 : 0;

        return (
          <span key={starValue} className="star-wrapper">
            <span className="star empty">★</span>
            {(isFull || isPartial) && (
              <span
                className="star filled"
                style={isPartial ? { width: `${fillPercentage}%` } : {}}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default function Womens() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [gridView, setGridView] = useState("grid-3");
  const sortButtonRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { productReviews } = useReviews();
  const { toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    if (quickViewProduct) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = "";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [quickViewProduct]);

  useEffect(() => {
    const productType = searchParams.get("productType");
    if (productType) {
      setSelectedTypes([productType]);
    } else {
      setSelectedTypes([]);
    }
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGridView("grid-2");
      } else {
        setGridView("grid-3");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedPriceRange([]);
    setSelectedColors([]);
    setSelectedTypes([]);
    setSortBy("featured");
    setActiveFilter(null);
    navigate("/womens");
    toast.success("Filters reset successfully!", {
      position: "top-right",
      duration: 2000,
      className: "custom-toast custom-toast-success",
    });
  };

  const handleImageNavigation = (productId, direction) => {
    const product = products.find((p) => p.id === productId);
    const currentIndex = currentImageIndex[productId] || 0;
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % product.images.length
        : (currentIndex - 1 + product.images.length) % product.images.length;
    setCurrentImageIndex({ ...currentImageIndex, [productId]: newIndex });
  };

  const filteredProducts = products.filter((product) => {
    if (selectedSizes.length && !selectedSizes.includes(product.size)) return false;
    if (selectedColors.length && !selectedColors.includes(product.color)) return false;
    if (selectedTypes.length && !selectedTypes.includes(product.category)) return false;
    if (selectedPriceRange.length) {
      const [min, max] = selectedPriceRange[0].split("-").map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "lowToHigh": return a.price - b.price;
      case "highToLow": return b.price - a.price;
      case "az": return a.name.localeCompare(b.name);
      case "za": return b.name.localeCompare(a.name);
      case "newCollection": return new Date(b.id) - new Date(a.id);
      case "bestseller": return (b.sales || 0) - (a.sales || 0);
      case "featured": return 0;
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleViewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const initialImageIndex = {};
    products.forEach((product) => {
      initialImageIndex[product.id] = 0;
    });
    setCurrentImageIndex(initialImageIndex);
  }, []);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key={1}
            className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        if (startPage > 2) pageNumbers.push(<span key="start-ellipsis" className="pagination-ellipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push(<span key="end-ellipsis" className="pagination-ellipsis">...</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            className={`pagination-btn ${currentPage === totalPages ? "active" : ""}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
    return pageNumbers;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortButtonRef.current && !sortButtonRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAverageRating = (productId) => {
    const reviews = productReviews[productId] || [];
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const handleWishlistToggle = (product) => {
    toggleWishlist(product);
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-container">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="carousel-image-container">
                  <img
                    src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/92b437da-d5d3-4349-a62c-71951eea4705.__CR0,0,970,600_PT0_SX970_V1___.png"
                    className="d-block w-100 carousel-image"
                    alt="First slide"
                  />
                  <div className="carousel-caption">
                    <div className="caption-content">
                      <h1 className="display-4 fw-bold mb-4">Elegance in Every Thread</h1>
                      <p className="lead">Discover the timeless beauty of handcrafted sarees and ethnic wear.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-image-container">
                  <img
                    src="https://t4.ftcdn.net/jpg/01/67/25/37/360_F_167253732_FVaF7PyA5vat3JVPvP4F5AsCoZkYAnZF.jpg"
                    className="d-block w-100 carousel-image"
                    alt="Second slide"
                  />
                  <div className="carousel-caption">
                    <div className="caption-content">
                      <h1 className="display-4 fw-bold mb-4">Tradition Meets Modernity</h1>
                      <p className="lead">Celebrate your heritage with our exquisite collection of sarees.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-image-container">
                  <img
                    src="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2025-01/hyhygtfrrde.jpg"
                    className="d-block w-100 carousel-image"
                    alt="Third slide"
                  />
                  <div className="carousel-caption">
                    <div className="caption-content">
                      <h1 className="display-4 fw-bold mb-4">Graceful Sophistication</h1>
                      <p className="lead">Elevate your style with our curated women's ethnic wear.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid p-4">
        <div className="product-view-controls">
          <div className="controls-left">
            <button className="btn btn-outline-dark d-flex align-items-center gap-2 me-3" onClick={toggleFilters}>
              <Filter size={16} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <div className="dropdown" ref={sortButtonRef}>
              <button className="btn btn-outline-dark sort-btn" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                Sort by
                <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
              </button>
              {showSortDropdown && (
                <ul className="sort-dropdown-menu">
                  {["featured", "az", "za", "lowToHigh", "highToLow", "newCollection", "bestseller"].map((option) => (
                    <li key={option}>
                      <button
                        className="sort-dropdown-item"
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option === "featured" ? "Featured" :
                          option === "az" ? "A-Z" :
                            option === "za" ? "Z-A" :
                              option === "lowToHigh" ? "Price: Low to High" :
                                option === "highToLow" ? "Price: High to Low" :
                                  option === "newCollection" ? "New Collection" : "Bestseller"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <span className="product-count text-muted">{sortedProducts.length} products</span>
          <div className="controls-right">
            <div className="grid-view-switcher d-none d-md-flex">
              <button className={`grid-view-btn ${gridView === "grid-3" ? "active" : ""}`} onClick={() => setGridView("grid-3")} aria-label="3 products per row">
                <Grid size={18} />
              </button>
              <button className={`grid-view-btn ${gridView === "grid-4" ? "active" : ""}`} onClick={() => setGridView("grid-4")} aria-label="4 products per row">
                <Grid2X2 size={18} />
              </button>
              <button className={`grid-view-btn ${gridView === "grid-6" ? "active" : ""}`} onClick={() => setGridView("grid-6")} aria-label="6 products per row">
                <Grid3X3 size={18} />
              </button>
            </div>
            <div className="grid-view-switcher-mobile d-flex d-md-none">
              <button className={`grid-view-btn ${gridView === "grid-1" ? "active" : ""}`} onClick={() => setGridView("grid-1")} aria-label="1 product per row">
                <Grid size={18} />
              </button>
              <button className={`grid-view-btn ${gridView === "grid-2" ? "active" : ""}`} onClick={() => setGridView("grid-2")} aria-label="2 products per row">
                <Grid2X2 size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className={`col-lg-3 filters-sidebar ${showFilters ? "show" : ""}`}>
            <div className="p-3 border rounded">
              <div className="filter-actions mb-3 d-flex justify-content-between">
                <button className="btn filter-reset-btn" onClick={resetFilters}>Reset Filters</button>
                <button className="btn filter-close-btn" onClick={toggleFilters}><X size={20} /></button>
              </div>
              <div className="filter-section">
                <h5 className="mb-3 filter-header" onClick={() => toggleFilter("size")}>
                  Size
                  <ChevronDown size={20} className={`float-end ${activeFilter === "size" ? "rotate-180" : ""}`} />
                </h5>
                {activeFilter === "size" && (
                  <div className="d-flex flex-wrap gap-2">
                    {products[0]?.sizes?.map((size) => (
                      <button
                        key={size}
                        className={`size-btn ${selectedSizes.includes(size) ? "active" : ""}`}
                        onClick={() => setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter-section">
                <h5 className="mb-3 filter-header" onClick={() => toggleFilter("price")}>
                  Price
                  <ChevronDown size={20} className={`float-end ${activeFilter === "price" ? "rotate-180" : ""}`} />
                </h5>
                {activeFilter === "price" && (
                  <div>
                    {["0-5000", "5000-10000", "10000-15000"].map((range) => (
                      <div key={range} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedPriceRange.includes(range)}
                          onChange={() => setSelectedPriceRange((prev) => prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range])}
                        />
                        <label className="form-check-label">₹{range}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter-section">
                <h5 className="mb-3 filter-header" onClick={() => toggleFilter("type")}>
                  Product Type
                  <ChevronDown size={20} className={`float-end ${activeFilter === "type" ? "rotate-180" : ""}`} />
                </h5>
                {activeFilter === "type" && (
                  <div>
                    {["Hand painted Saree", "Pattchitra Saree", "Embroidered saree", "Kurtaset", "Co-ordset"].map((type) => (
                      <div key={type} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedTypes.includes(type)}
                          onChange={() => setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])}
                        />
                        <label className="form-check-label">{type}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter-section">
                <h5 className="mb-3 filter-header" onClick={() => toggleFilter("color")}>
                  Color
                  <ChevronDown size={20} className={`float-end ${activeFilter === "color" ? "rotate-180" : ""}`} />
                </h5>
                {activeFilter === "color" && (
                  <div className="d-flex flex-wrap gap-3">
                    {[...new Set(products.map((p) => p.color))].map((color) => (
                      <div
                        key={color}
                        className="color-option"
                        onClick={() => setSelectedColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color])}
                      >
                        <div className={`color-circle ${selectedColors.includes(color) ? "selected" : ""}`} style={{ backgroundColor: color }} />
                        <small className="d-block text-muted">{color}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`${showFilters ? "col-lg-9" : "col-12"}`}>
            <div className={`row row-cols-${gridView === "grid-1" ? "1" : gridView === "grid-2" ? "2" : gridView === "grid-3" ? "1 row-cols-md-3" : gridView === "grid-4" ? "2 row-cols-md-4" : "2 row-cols-md-6"} g-4 product-grid ${gridView}`}>
              {paginatedProducts.map((product) => (
                <div key={product.id} className="col product-col">
                  <div className="product-card">
                    <div className="product-image-container">
                      <img
                        src={product.images[currentImageIndex[product.id]] || "/placeholder.svg"}
                        alt={product.name}
                        className="img-fluid product-image"
                      />
                      <div className="product-overlay">
                        <button className="btn btn-light btn-sm quick-buy" onClick={() => setQuickViewProduct(product)}>Quick View</button>
                        <div className="image-navigation">
                          <button className="btn btn-light btn-sm" onClick={(e) => { e.stopPropagation(); handleImageNavigation(product.id, "prev"); }}>
                            <ChevronLeft size={20} />
                          </button>
                          <button className="btn btn-light btn-sm" onClick={(e) => { e.stopPropagation(); handleImageNavigation(product.id, "next"); }}>
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                      <button className="wishlist-btn" onClick={() => handleWishlistToggle(product)}>
                        <Heart
                          size={24}
                          fill={isInWishlist(product.id) ? "red" : "none"}
                          color={isInWishlist(product.id) ? "red" : "currentColor"}
                        />
                      </button>
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">{product.name}</h5>
                      <div className="price-container">
                        <span className="product-price">Rs. {product.price.toFixed(2)}</span>
                        <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
                        <span className="discount">{product.discount}</span>
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-primary custom-btn w-100"
                        onClick={(e) => { e.preventDefault(); handleViewProductDetails(product.id); }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-container mt-6">
                <button
                  className="btn btn-outline-dark pagination-nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <div className="pagination-numbers">{renderPagination()}</div>
                <button
                  className="btn btn-outline-dark pagination-nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {quickViewProduct && (
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{quickViewProduct.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setQuickViewProduct(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img src={quickViewProduct.images[0] || "/placeholder.svg"} alt={quickViewProduct.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                      <div className="quick-view-details">
                        <p className="product-description">{quickViewProduct.description}</p>
                        <div className="price-info">
                          <p><strong>Price:</strong> <span className="product-price">₹{quickViewProduct.price}</span></p>
                          <p><strong>Original Price:</strong> <span className="original-price">₹{quickViewProduct.originalPrice}</span></p>
                          <p><strong>Discount:</strong> <span className="discount">{quickViewProduct.discount}</span></p>
                        </div>
                        <div className="product-specs">
                          <p><strong>Color:</strong> {quickViewProduct.color}</p>
                          <p><strong>Size:</strong> {quickViewProduct.size}</p>
                        </div>
                        <div className="review-info">
                          <p><strong>Average Rating:</strong></p>
                          <div className="d-flex align-items-center">
                            <StarRating rating={getAverageRating(quickViewProduct.id)} />
                            <span className="ms-2">({getAverageRating(quickViewProduct.id)} / 5)</span>
                          </div>
                          <p className="mt-1">Based on {productReviews[quickViewProduct.id]?.length || 0} reviews</p>
                        </div>
                        <Link
                          to={`/product/${quickViewProduct.id}`}
                          className="btn btn-primary custom-btn w-100 mt-3"
                          onClick={(e) => { e.preventDefault(); setQuickViewProduct(null); handleViewProductDetails(quickViewProduct.id); }}
                        >
                          View Full Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Removed ToastContainer */}
      </div>
    </>
  );
}