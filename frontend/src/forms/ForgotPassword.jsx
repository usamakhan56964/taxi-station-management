
// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth2.css"; // updated CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecover = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      if (response.data.success) {
        setMessage("Reset link sent to your email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fpw-container">
      <div className="fpw-box">
        <h2>Forgot Password</h2>
        <p>
          Remembered it? <Link to="/">Login</Link>
        </p>

        {error && <div className="fpw-error">{error}</div>}
        {message && <div className="fpw-success">{message}</div>}

        <form onSubmit={handleRecover}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
