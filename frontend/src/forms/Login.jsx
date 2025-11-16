
// Login.jsx src
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    if (response.data.success) {
      // Keep loader for 2 seconds, then hide and navigate
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000); // adjust delay here
    } else {
      // If login fails, hide loader immediately
      setLoading(false);
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
    setLoading(false);
  }
};


  return (
    <>
      {/* Preloader */}
      {loading && (
        <div className="preloader-overlay">
          <div className="loader"></div>
        </div>
      )}

      <div className="auth-container">
        <div className="container-body">
          <div className="auth-left">
            <div className="overlay">
              <h1>Admin Portal</h1>
            </div>
          </div>

          <div className="auth-right">
            <h2>Admin Login</h2>
            <p>
              <Link to="/forgot-password">Forgotten password?</Link>
            </p>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;




/*app.use(cors({
  origin: "http://localhost:5174", // your React dev server
  credentials: true                // allow cookies/auth headers
}));*/
