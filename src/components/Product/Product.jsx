import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product.css";
import img2 from "../../Aseets/pic2.jpg";
import img3 from "../../Aseets/pic3.jpg";
import img6 from "../../Aseets/pic6.jpg";
import img7 from "../../Aseets/pic7.jpg";
import img1 from "../../Aseets/pic1.webp";
import img4 from "../../Aseets/pic4.jpeg";
import img5 from "../../Aseets/pic5.jpeg";
import img8 from "../../Aseets/pic8.jpeg";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Slim striped pocket shirt",
      price: 59.0,
      category: "men",
      image: img1,
      rating: 5,
    },
    {
      id: 2,
      name: "Tropical Kimono",
      price: 49.0,
      originalPrice: 59.0,
      category: "women",
      image: img2,
      rating: 4,
      onSale: true,
    },
    {
      id: 3,
      name: "Contrasting sunglasses",
      price: 59.0,
      category: "women",
      image: img3,
      rating: 5,
    },
    {
      id: 4,
      name: "Water resistant backpack",
      price: 49.0,
      originalPrice: 59.0,
      category: "men",
      image: img4,
      rating: 5,
      onSale: true,
    },
    {
      id: 5,
      name: "Slim striped pocket shirt",
      price: 79.0,
      category: "men",
      image: img5,
      rating: 4,
    },
    {
      id: 6,
      name: "Yellow Saree",
      price: 49.0,
      originalPrice: 59.0,
      category: "women",
      image: img6,
      rating: 5,
      onSale: true,
    },
    {
      id: 7,
      name: "Green Lehenga",
      price: 49.0,
      originalPrice: 59.0,
      category: "women",
      image: img7,
      rating: 5,
      onSale: true,
    },
    {
      id: 8,
      name: "Water resistant backpack",
      price: 49.0,
      originalPrice: 59.0,
      category: "men",
      image: img8,
      rating: 5,
    },
  ];

  const filterProducts = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  };

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <span key={index} className="text-warning">
        ★
      </span>
    ));
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center fw-bold mb-4">NEW RELEASES</h2>

          {/* Category Navigation */}
          <div className="d-flex justify-content-center">
            <div className="category-nav">
              <button
                className={`category-btn ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => filterProducts("all")}
              >
                All
              </button>
              <button
                className={`category-btn ${
                  selectedCategory === "men" ? "active" : ""
                }`}
                onClick={() => filterProducts("men")}
              >
                Men
              </button>
              <button
                className={`category-btn ${
                  selectedCategory === "women" ? "active" : ""
                }`}
                onClick={() => filterProducts("women")}
              >
                Women
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {getFilteredProducts().map((product) => (
          <div key={product.id} className="col-md-6 col-lg-3">
            <div className="product-card">
              <div className="position-relative">
                {product.onSale && <div className="sale-badge">SALE</div>}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="img-fluid product-image"
                />
              </div>
              <div className="product-info text-center mt-3">
                <h5 className="product-title mb-2">{product.name}</h5>
                <div className="product-rating mb-2">
                  {renderStars(product.rating)}
                </div>
                <div className="product-price">
                  <span className="text-danger me-2">
                    ${product.price.toFixed(1)}
                  </span>
                  {product.originalPrice && (
                    <span className="original-price">
                      ${product.originalPrice.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
