import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginSignup.css";
import { useAuth } from "../../AuthContext";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const validatePassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (strongRegex.test(password)) return "strong";
    else if (mediumRegex.test(password)) return "medium";
    else return "weak";
  };

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if all required fields are filled in before submitting
    if (!formData.email || !formData.password || (!isLogin && (!formData.name || !formData.phone))) {
      setError("Please fill in all required fields.");
      return;
    }

    const url = isLogin
      ? "http://82.29.164.13:8001/api/auth/user/login"
      : "http://82.29.164.13:8001/api/auth/user/signup";

    const payload = isLogin
      ? {
        email_or_phone: formData.email, // Assuming email_or_phone is the API's expected field
        password: formData.password,
      }
      : formData;

    console.log("Request Payload:", payload); // Log the request payload

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(isLogin ? "Login successful!" : "Registration successful!");
        login(data.token); // This updates auth context and sets token

        localStorage.setItem("token", data.token); // Assuming data.token is your token

        // If it's a sign-up, directly toggle the form to login view
        if (!isLogin) {
          setTimeout(() => {
            setIsLogin(true); // Switch to login after successful signup
          }, 1000); // Delay to show success message
        } else {
          setTimeout(() => {
            navigate("/"); // Navigate to home on successful login
          }, 1000);
        }
      } else {
        // Log the error message from the server
        console.error("API Error:", data);
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="login-signup-container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <div className="card shadow">
          <div className="card-body p-4 p-md-5">
            <h1 className="card-title text-center mb-4">
              {isLogin ? "Login" : "Sign Up"}
            </h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              {/* Only show name and phone fields for sign-up */}
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="Enter Your Contact"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Password"
                  required
                  value={formData.password}
                  onChange={handleChange2}
                  autoComplete="new-password"
                />
                {formData.password && (
                  <div className="mt-1">
                    <small
                      style={{
                        color:
                          passwordStrength === "strong"
                            ? "green"
                            : passwordStrength === "medium"
                              ? "orange"
                              : "red",
                      }}
                    >
                      Password strength: {passwordStrength}
                    </small>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mb-3"
                disabled={passwordStrength === "weak"}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>

              <p className="text-center mb-3">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span className="text-primary cursor-pointer" onClick={toggleForm}>
                  {isLogin ? "Sign Up Here" : "Login Here"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
