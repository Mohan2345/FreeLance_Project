import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShare2, FiMinus, FiPlus, FiChevronDown, FiChevronUp, FiX, FiChevronLeft, FiChevronRight, FiCheckCircle, FiTruck, FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner"; // Changed import from react-toastify to sonner
import { useCart } from "../../CartContext/CartContext";
import "./Product.css";
import WomenData from "../../WomenData"; // Women's product data
import Data from "../../Data";   // Men's product data (assumed path)
import { useReviews } from "../../ReviewContext/ReviewContext";
import video from '../../Aseets/prvideo.mp4';

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [wishlistUpdate, setWishlistUpdate] = useState(0);

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { productReviews, updateReviews } = useReviews();

  // Combine all products from WomenData and Data
  const allProducts = [...WomenData.products, ...Data.products];

  // Find the product by ID
  const product = allProducts.find((p) => p.id === parseInt(id)) || {
    name: "Sample Product",
    price: 299.99,
    description: "This is a sample product description.",
    color: "Blue",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  };

  // Related products from the same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (product?.images?.[0]) {
      const img = new Image();
      img.src = product.images[0];
      img.onload = () => setIsImageLoading(false);
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    const success = addToCart(product, quantity, selectedSize);
    if (success) navigate("/checkout");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          duration: 3000,
          className: "custom-toast custom-toast-success",
        });
      }
    } catch (error) {
      toast.error("Failed to share", {
        position: "top-right",
        duration: 2000,
        className: "custom-toast custom-toast-error",
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: (productReviews[id]?.length || 0) + 1,
      rating,
      title: reviewTitle,
      comment: reviewComment,
      name: reviewerName,
      date: new Date().toISOString().split("T")[0],
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };
    updateReviews(id, newReview);
    toast.success("Review submitted successfully!", {
      position: "top-right",
      duration: 3000,
      className: "custom-toast custom-toast-success",
    });
    setShowReviewForm(false);
    setRating(0);
    setReviewTitle("");
    setReviewComment("");
    setReviewerName("");
    setReviewerEmail("");
    setSelectedFile(null);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setRating(0);
    setReviewTitle("");
    setReviewComment("");
    setReviewerName("");
    setReviewerEmail("");
    setSelectedFile(null);
    toast.info("Review cancelled", {
      position: "top-right",
      duration: 2000,
      className: "custom-toast custom-toast-info",
    });
  };

  const handleRelatedProductClick = (relatedProduct) => {
    navigate(`/product/${relatedProduct.id}`);
    window.scrollTo(0, 0);
  };

  const handleLoadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 2);
    setShowAllReviews(true);
  };

  const handleShowLessReviews = () => {
    setVisibleReviews(2);
    setShowAllReviews(false);
  };

  const handleImageClick = (image) => {
    setEnlargedImage(image);
  };

  const handleCloseImage = () => {
    setEnlargedImage(null);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector(".related-product-card").offsetWidth + 20;
      const visibleCards = window.innerWidth > 1200 ? 4 : window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
      const scrollAmount = cardWidth * visibleCards;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector(".related-product-card").offsetWidth + 20;
      const visibleCards = window.innerWidth > 1200 ? 4 : window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
      const scrollAmount = cardWidth * visibleCards;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleWishlistToggle = (product) => {
    toggleWishlist(product);
    setWishlistUpdate((prev) => prev + 1);
  };

  const reviews = productReviews[id] || [];
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;
  const hasMoreReviews = visibleReviews < reviews.length;

  const maxScroll = scrollRef.current ? scrollRef.current.scrollWidth - scrollRef.current.clientWidth : 0;
  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollPosition >= maxScroll - 10;

  const StarRating = ({ rating, isInteractive = false, onRate = () => {} }) => {
    return (
      <div className={isInteractive ? "star-rating interactive" : "star-rating"}>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isFull = starValue <= Math.floor(rating);
          const isPartial = starValue === Math.ceil(rating) && rating % 1 !== 0;
          const fillPercentage = isPartial ? (rating % 1) * 100 : 0;

          return (
            <span
              key={starValue}
              className="star-wrapper"
              onClick={isInteractive ? () => onRate(starValue) : undefined}
            >
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

  return (
    <div className="product-page c-container">
      <div className="content-layout">
        <div className="gallery-container">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            className={`main-image ${isImageLoading ? "loading" : "loaded"}`}
          />
          <div className="thumbnails-container">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-wrapper ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="product-details-layout">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="action-buttons">
              <button className="btn btn-outline-secondary me-3" onClick={handleShare}>
                <FiShare2 />
              </button>
              <button
                className={`btn product-wishlist-btn ${isInWishlist(product.id) ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => handleWishlistToggle(product)}
              >
                <FiHeart />
              </button>
            </div>
          </div>

          <div className="rating-section">
            <StarRating rating={averageRating} />
            <span className="review-count">({reviews.length})</span>
          </div>

          <div className="price-section">
            <p className="tax-info">Tax Included</p>
            <div className="price-details">
              <h2 className="product-price">₹{product.price.toFixed(2)}</h2>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="discount">{product.discount}</span>
                </>
              )}
            </div>
          </div>

          <div className="color-section">
            <h3 className="section-heading">Color</h3>
            <div className="color-info">
              <div className="color-circle" style={{ backgroundColor: product.color }}></div>
              <span>{product.color}</span>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="size-section">
            <h3 className="section-heading">Select Size</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <h3 className="section-heading">Quantity</h3>
            <div className="quantity-container">
              <button className="quantity-btn quantity-minus" onClick={() => handleQuantityChange(-1)}>
                <FiMinus />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button className="quantity-btn quantity-plus" onClick={() => handleQuantityChange(1)}>
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="action-buttons-container">
            <button className="btn btn-primary w-100 mb-2 animated-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-primary w-100 c-btn animated-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          <div className="additional-info">
            <p><FiCheckCircle className="info-icon" /> 100% Original product.</p>
            <p><FiTruck className="info-icon" /> Cash on delivery is available.</p>
            <p><FiRefreshCw className="info-icon" /> Easy return & exchange within 7 days.</p>
          </div>
        </div>
      </div>

      <section className="video-section">
        <video
          className="w-100"
          autoPlay
          loop
          muted
          controls={true}
          src={video}
          title="Product promotional video"
        />
      </section>

      <div className="related-products mt-5">
        <h2 className="section-heading text-center">You May Also Like</h2>
        <div className="related-products-container">
          <button className={`scroll-btn scroll-left ${isAtStart ? "hidden" : ""}`} onClick={scrollLeft}>
            <FiChevronLeft />
          </button>
          <div className="related-products-scroll" ref={scrollRef}>
            {relatedProducts.map((item) => (
              <div key={item.id} className="related-product-card" onClick={() => handleRelatedProductClick(item)}>
                <div className="related-product-image-container">
                  <img src={item.image || "/placeholder.svg"} className="related-product-image" alt={item.name} />
                  <button
                    className={`wishlist-icon ${isInWishlist(item.id) ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(item);
                    }}
                  >
                    <FiHeart />
                  </button>
                </div>
                <div className="related-product-info">
                  <h5 className="related-product-title">{item.name}</h5>
                  <div className="related-product-price">
                    <span className="current-price">₹{item.price}</span>
                    <span className="original-price">₹{item.originalPrice.toFixed(2)}</span>
                    <span className="discount">{item.discount}</span>
                  </div>
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <button className={`scroll-btn scroll-right ${isAtEnd ? "hidden" : ""}`} onClick={scrollRight}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="review-section mt-5">
        <h2 className="section-heading text-center">Customer Reviews</h2>
        <div className="review-summary text-center mb-4">
          {reviews.length > 0 ? (
            <div>
              <div className="average-rating">
                <span className="rating-score">{averageRating}</span>
                <StarRating rating={averageRating} />
              </div>
              <p className="review-count">{reviews.length} reviews</p>
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to write a review!</p>
          )}
        </div>

        <button
          className="btn btn-outline-primary d-block mx-auto mb-4"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? "Hide Review Form" : "Write a Review"}
        </button>

        {showReviewForm && (
          <div className="review-form-container">
            <form onSubmit={handleSubmitReview} className="review-form">
              <h3 className="section-heading text-center">Write a Review</h3>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <StarRating rating={rating} isInteractive={true} onRate={setRating} />
              </div>
              <div className="form-group">
                <label className="form-label">Review Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Give Your Review Title"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Review</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write Your Review Here"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Picture/Video (optional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={reviewerEmail}
                  onChange={(e) => setReviewerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <p className="text-muted small text-center">
                  How we use your data: We'll only contact you about the review you left, and only if necessary.
                </p>
              </div>
              <div className="review-buttons">
                <button type="button" className="btn btn-primary c-btn" onClick={handleCancelReview}>
                  Cancel Review
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="customer-reviews">
            {reviews.slice(0, visibleReviews).map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h5 className="reviewer-name">{review.name}</h5>
                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <h4 className="review-title">{review.title}</h4>
                <p className="review-comment">{review.comment}</p>
                {review.image && (
                  <div className="review-image-container">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt="Review attachment"
                      className="review-image"
                      onClick={() => handleImageClick(review.image)}
                    />
                  </div>
                )}
              </div>
            ))}
            {(hasMoreReviews || showAllReviews) && (
              <div className="load-more-container">
                {hasMoreReviews && (
                  <button className="btn btn-primary load-more-btn" onClick={handleLoadMoreReviews}>
                    Load More Reviews
                  </button>
                )}
                {showAllReviews && (
                  <button className="btn btn-secondary show-less-btn" onClick={handleShowLessReviews}>
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {enlargedImage && (
        <div className="image-modal-overlay" onClick={handleCloseImage}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={handleCloseImage}>
              <FiX />
            </button>
            <img src={enlargedImage || "/placeholder.svg"} alt="Enlarged review attachment" className="enlarged-image" />
          </div>
        </div>
      )}
      {/* Removed ToastContainer as Sonner doesn't require it */}
    </div>
  );
};

export default Product;