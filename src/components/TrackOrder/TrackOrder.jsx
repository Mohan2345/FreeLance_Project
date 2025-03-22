 "use client";

import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useCart } from "../../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBoxOpen, FaCheckCircle, FaTruck, FaUserCheck } from "react-icons/fa";
import "./TrackOrder.css";

const TrackOrder = () => {
  const { orders, getOrderTracking } = useCart();
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Tracking stages in order (as per the image)
  const trackingStages = [
    { label: "Confirmed Order", icon: <FaShoppingCart /> },
    { label: "Processing Order", icon: <FaBoxOpen /> },
    { label: "Quality Check", icon: <FaCheckCircle /> },
    { label: "Dispatched Item", icon: <FaTruck /> },
    { label: "Product Delivered", icon: <FaUserCheck /> },
  ];

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError("");
    setTrackingInfo(null);
    setOrderDetails(null);
    setShowModal(false);

    // Check if the order ID matches an existing order
    const order = orders.find((o) => o.id === orderId);
    if (!order) {
      setError("Order not found. Please check your Order ID.");
      return;
    }

    // Get tracking information for the order
    const tracking = getOrderTracking(orderId);
    if (tracking) {
      setTrackingInfo(tracking);
      setOrderDetails(order);
      setShowModal(true);
    } else {
      setError("Tracking information not available for this order.");
    }
  };

  // Determine the current stage index based on tracking status
  const getCurrentStageIndex = () => {
    if (!trackingInfo) return -1;
    const stageLabels = trackingStages.map((stage) => stage.label);
    return stageLabels.indexOf(trackingInfo.status);
  };

  const currentStageIndex = getCurrentStageIndex();

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderId("");
  };

  return (
    <Container className="track-order-container py-5 mt-5">
      <h2 className="track-order-title mb-4">Shipment Track</h2>
      <Form onSubmit={handleTrackOrder} className="track-order-form">
        <Form.Group controlId="orderId" className="mb-3">
          <Form.Label>Enter Order ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., 12345678901234"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="track-btn">
          Track Order
        </Button>
      </Form>

      {error && <p className="error-message mt-3">{error}</p>}

      {/* Modal for displaying tracking information */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        animation={true}
        className="tracking-modal"
      >
        <Modal.Header closeButton className="tracking-header">
          <Modal.Title>Order Tracking: Order #{orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trackingInfo && orderDetails && (
            <>
              <div className="tracking-info">
                <p>
                  <strong>Confirmed Order:</strong>{" "}
                  {new Date(orderDetails.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Expected Date:</strong>{" "}
                  {trackingInfo.estimatedDelivery ||
                    new Date(
                      new Date(orderDetails.date).setDate(
                        new Date(orderDetails.date).getDate() + 7
                      )
                    ).toLocaleDateString()}
                </p>
              </div>

              {/* Status and Tracking Progress Bar */}
              <div className="tracking-status">
                <p>
                  <strong>Status:</strong> {trackingInfo.status}
                </p>
              </div>
              <div className="tracking-progress">
                {trackingStages.map((stage, index) => (
                  <div key={stage.label} className="tracking-step">
                    <div
                      className={`step-circle ${
                        index <= currentStageIndex ? "completed" : "pending"
                      }`}
                    >
                      {stage.icon}
                    </div>
                    <p className="step-label">{stage.label}</p>
                    {index < trackingStages.length - 1 && (
                      <div
                        className={`step-line ${
                          index < currentStageIndex ? "completed" : "pending"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="tracking-footer">
          <Button
            variant="outline-primary"
            onClick={() => {
              handleCloseModal();
              navigate("/my-orders");
            }}
            className="view-orders-btn"
          >
            View All Orders
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TrackOrder;