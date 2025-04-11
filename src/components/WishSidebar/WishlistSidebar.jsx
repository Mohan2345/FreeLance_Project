// WishlistSidebar.jsx
import { useCart } from "../../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import "./WishlistSidebar.css";

const WishlistSidebar = ({ isOpen, onClose }) => {
  const { wishlistItems, toggleWishlist } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  return (
    <div className={`wishlist-sidebar ${isOpen ? "open" : ""}`}>
      <div className="wishlist-sidebar-content">
        <div className="wishlist-header">
          <h3>Your Wishlist</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        {wishlistItems.length === 0 ? (
          <p className="empty-message">Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  className="wishlist-item-image"
                />
                <div className="wishlist-item-center">
                  <h5 className="wishlist-item-title">{item.name}</h5>
                  <p className="wishlist-item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="wishlist-item-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleProductClick(item.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => toggleWishlist(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;