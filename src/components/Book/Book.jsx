import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Book.css"
import React from "react"
import bookimg from "../../Aseets/bookback.jpg"


const Book = () => {
  const navigate = useNavigate()

  const handleBooking = () => {
    navigate("/booking-form")
  }

  return (
    <div 
    style={{
      backgroundImage: `url(${bookimg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className="book-section">
      <div className="overlay">
        <h1 className="book-title">Schedule an Appointment</h1>
        <p className="book-subtitle">
          Click below to schedule a virtual or an in-store appointment at one of our flagship stores.
        </p>
        <button className="btn book-button" onClick={handleBooking}>
          BOOK NOW
        </button>
      </div>
    </div>
  )
}

export default Book

