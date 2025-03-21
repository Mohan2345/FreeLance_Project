import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./LoginSignup.css"

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginIdentifier, setLoginIdentifier] = useState("")
  const navigate = useNavigate()

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setShowPassword(false)
    setLoginIdentifier("")
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (loginIdentifier) {
      setShowPassword(true)
    }
  }

  const handleBack = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      navigate(-1) // Go back to the previous page
    }
  }

  return (
    <div className="login-signup-container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div className="card shadow">
          <div className="card-body p-4 p-md-5">
            <h1 className="card-title text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={handleContinue}>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg w-100"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg w-100"
                      placeholder="Enter Your Contact"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg w-100"
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg w-100"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                </>
              )}
              {isLogin && !showPassword && (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg w-100"
                    placeholder="Enter Your Email or Mobile"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                  />
                </div>
              )}
              {isLogin && showPassword && (
                <div className="mb-3 position-relative">
                  <input
                    type="password"
                    className="form-control form-control-lg w-100"
                    placeholder="Enter Your Password"
                    required
                  />
                  <Link
                    to="/forgot-password"
                    className="position-absolute end-0 top-50 translate-middle-y me-3 text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                {isLogin && !showPassword ? "Continue" : isLogin ? "Login" : "Sign Up"}
              </button>
              {isLogin && showPassword && (
                <button type="button" className="btn btn-secondary btn-lg w-100 mb-3" onClick={handleBack}>
                  Back
                </button>
              )}
              <p className="text-center mb-3">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span className="text-primary cursor-pointer" onClick={toggleForm}>
                  {isLogin ? "Sign Up Here" : "Login Here"}
                </span>
              </p>
              {!isLogin && (
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                  <label
                    className="form-check-label text-muted text-decoration-underline cursor-pointer"
                    htmlFor="agreeTerms"
                  >
                    By continuing, I agree to the terms of use and privacy policy
                  </label>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup

