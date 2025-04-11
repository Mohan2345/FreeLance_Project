import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useCart } from "../../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const MyOrders = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Redirect to product page
  };

  const handleWriteReview = (productId) => {
    navigate(`/product/${productId}#reviews`); // Redirect to product page review section
  };

  return (
    <Container className="my-orders-container py-5 mt-5">
      <h2 className="my-orders-title mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-orders text-center py-5">
          <p className="text-muted mb-3">You haven't placed any orders yet.</p>
          <Button
            variant="primary"
            className="start-shopping-btn"
            onClick={() => navigate("/")}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <Card key={order.id} className="order-card mb-4 shadow-sm">
              <Card.Header className="order-header">
                <div className="order-header-content">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Card.Header>
              <Card.Body className="order-body">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.images?.[0] || "/placeholder.svg"}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <span
                        className="order-item-name"
                        onClick={() => handleProductClick(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleProductClick(item.id)}
                      >
                        {item.name}
                      </span>
                      <span className="order-item-size">Size: {item.selectedSize}</span>
                      <span className="order-item-quantity">Qty: {item.quantity}</span>
                      <span
                        className="order-item-review"
                        onClick={() => handleWriteReview(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleWriteReview(item.id)}
                      >
                        Write Review
                      </span>
                    </div>
                    <div className="order-item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer className="order-footer">
                <span className="order-total-label">Total:</span>
                <span className="order-total-amount">₹{order.total.toFixed(2)}</span>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyOrders;