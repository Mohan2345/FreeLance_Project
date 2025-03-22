import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../../CartContext/CartContext";
import { FiX } from "react-icons/fi";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    updateCartItemQuantity,
    couponCode,
    setCouponCode,
    discount,
    isCouponApplied,
    applyCoupon,
    getFinalTotal,
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(item.id, newQuantity, item.selectedSize);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedSize);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, discount, isCouponApplied } });
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };

  return (
    <div className="cart-page-container">
      <Toaster richColors position="top-right" />
      <h2 className="cart-page-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty</p>
          <Button
            variant="outline-primary"
            className="continue-shopping-btn professional-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-table-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${index}`}
                className="cart-table-row animate-row"
              >
                <div className="cart-item-product">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <FiX size={20} />
                  </button>
                  <img
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <span className="cart-item-name">{item.name}</span>
                </div>
                <div className="cart-item-price">
                  <span className="label">Price: </span>
                  ₹{item.price.toFixed(2)}
                </div>
                <div className="quantity-controls">
                  <span className="label">Quantity: </span>
                  <div className="quantity-controls-inner">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-subtotal">
                  <span className="label">Subtotal: </span>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button
                className="apply-coupon-btn professional-btn"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </button>
            </div>
          </div>

          <div className="cart-totals">
            <h3>Cart Totals</h3>
            <div className="totals-row">
              <span>Subtotal</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="totals-row">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="totals-row">
              <span>Total</span>
              <span>₹{getFinalTotal().toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn professional-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;