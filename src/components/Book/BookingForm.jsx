import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Changed import from react-toastify to sonner
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookingForm.css";
import logo from "../../Aseets/finallogo.png";

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "",
    purpose: "0",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (formData.purpose === "0") newErrors.purpose = "Please select purpose of appointment";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form submitted successfully:", formData);
      toast.success("Appointment booked successfully!", {
        position: "top-right",
        duration: 3000,
        className: "custom-toast custom-toast-success",
      });
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        date: "",
        time: "",
        purpose: "0",
        message: "",
      });
      setErrors({});
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="booking-page d-flex flex-column min-vh-100 mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Brand Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/booking-form">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Book Your Appointment</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="time"
                        className={`form-control ${errors.time ? "is-invalid" : ""}`}
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                      />
                      {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <select
                      className={`form-select ${errors.purpose ? "is-invalid" : ""}`}
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                    >
                      <option value="0">Purpose Of Appointment</option>
                      <option value="1">Personal Shopping Assistance</option>
                      <option value="2">Customer Loyalty Programs</option>
                      <option value="3">Specialty Services</option>
                      <option value="4">Exclusive Holidays or Sales Events</option>
                      <option value="5">Product Demonstrations</option>
                      <option value="6">Tailoring and Alterations</option>
                      <option value="7">Other</option>
                    </select>
                    {errors.purpose && <div className="invalid-feedback">{errors.purpose}</div>}
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Book Appointment
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed ToastContainer as Sonner doesn't require it */}
    </div>
  );
};

export default BookingForm;