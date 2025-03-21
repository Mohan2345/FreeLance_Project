import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./LoginSignup.css"

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.")
    } else {
      // Handle password reset logic here
      console.log("Password reset successful")
      // Reset form and error state
      setNewPassword("")
      setConfirmPassword("")
      setError("")
    }
  }

  const togglePasswordVisibility = (field) => {
    if (field === "new") {
      setShowNewPassword(!showNewPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  return (
    <div className="login-signup-container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div className="card shadow">
          <div className="card-body p-4 p-md-5">
            <h1 className="card-title text-center mb-4">Reset Password</h1>
            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 position-relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control form-control-lg w-100 pe-5"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control form-control-lg w-100 pe-5"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

