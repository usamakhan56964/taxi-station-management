/*import React, { useState } from "react";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import logo from "../../assets/taxi-logo2.png"; // Place your logo in public folder

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
        </div>

        <div className="navbar-center">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;*/






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import logo from "../../assets/taxi-logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Call backend logout endpoint (adjust if needed)
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Optional: clear local storage token
      localStorage.removeItem("token");

      // Show loader for 1.5s before redirect
      setTimeout(() => {
        setLoading(false);
        navigate("/"); // back to login page
      }, 1500);
    } catch (err) {
      console.error("Logout failed", err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Preloader Overlay */}
      {loading && (
        <div className="preloader-overlay">
          <div className="loader"></div>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
        </div>

        <div className="navbar-center">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
