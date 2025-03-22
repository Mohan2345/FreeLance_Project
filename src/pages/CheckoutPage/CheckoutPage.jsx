// pages/CheckoutPage.js
import React, { useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { Button } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [discount] = useState(700); // Assuming discount from CartPage carries over
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateFinalTotal = () => {
    const subtotal = getTotalPrice();
    return Math.max(0, subtotal - discount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.name || !formData.email || !formData.address) {
      toast.error("Please fill in all required fields!", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    // Here you would typically send data to a backend
    toast.success("Order Placed Successfully!", {
      position: "top-right",
      duration: 3000,
    });
    
    // Redirect to home page after successful order (simulated)
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  return (
    <div className="checkout-page-container">
      <Toaster richColors position="top-right" />
      <h2 className="checkout-page-title">Checkout</h2>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="summary-item">
              <img
                src={item.images?.[0] || "/placeholder.svg"}
                alt={item.name}
                className="summary-image"
              />
              <div className="summary-details">
                <span className="item-name">{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
          <div className="summary-totals">
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
            <div className="totals-row total">
              <span>Total</span>
              <span>₹{calculateFinalTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Shipping Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                  />
                  Credit/Debit Card
                </label>
              </div>
            </div>
            <Button type="submit" className="place-order-btn professional-btn">
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;