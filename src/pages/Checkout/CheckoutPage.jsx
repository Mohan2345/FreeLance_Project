 // CheckoutPage.jsx
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting if cart is empty
  const { cartItems: passedCartItems = [], discount = 0, isCouponApplied = false } =
    location.state || {}; // Default to empty array if no state
  const [paymentMethod, setPaymentMethod] = useState("online");
  const DISCOUNT_AMOUNT = 700;

  const calculateSubtotal = () => {
    return passedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateTotal = () => Math.max(0, calculateSubtotal() - (isCouponApplied ? discount : 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "online") {
      alert("Redirecting to payment gateway...");
    } else {
      alert("Order placed successfully! Pay on delivery.");
    }
  };

  // Redirect to cart if no items are passed (e.g., on refresh or direct access)
  if (passedCartItems.length === 0) {
    return (
      <div className="checkout-page-container">
        <h2 className="checkout-page-title">Checkout</h2>
        <div className="empty-checkout">
          <p>No items in cart. Please add items to proceed.</p>
          <Button
            variant="outline-primary"
            className="continue-shopping-btn professional-btn"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <h2 className="checkout-page-title">Checkout</h2>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {passedCartItems.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize}-${index}`} className="summary-item">
                <div className="summary-item-details">
                  <img
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="summary-item-image"
                  />
                  <div>
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-size">Size: {item.selectedSize}</span>
                    <span className="summary-item-qty">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="summary-item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            {isCouponApplied && (
              <div className="totals-row discount">
                <span>Discount (SAVE700)</span>
                <span>-₹{DISCOUNT_AMOUNT.toFixed(2)}</span>
              </div>
            )}
            <div className="totals-row total">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Compact Checkout Form */}
        <div className="checkout-form-container">
          <h3>Shipping Information</h3>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Name</label>
                <input type="text" id="fullName" placeholder="Amit Sharma" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Mobile</label>
                <input type="tel" id="phone" placeholder="9876543210" pattern="[0-9]{10}" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Flat 301, MG Road" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="landmark">Landmark</label>
                <input type="text" id="landmark" placeholder="Near City Mall" />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input type="text" id="pincode" placeholder="400001" pattern="[0-9]{6}" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Mumbai" required />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" placeholder="Maharashtra" required />
              </div>
            </div>

            <div className="payment-options">
              <h4>Payment</h4>
              <div className="payment-row">
                <div className="payment-choice">
                  <input
                    type="radio"
                    id="online"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <label htmlFor="online">Online</label>
                </div>
                <div className="payment-choice">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label htmlFor="cod">COD</label>
                </div>
              </div>
            </div>

            <Button type="submit" className="pay-now-btn professional-btn">
              {paymentMethod === "online" ? "Pay Now" : "Place Order"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;