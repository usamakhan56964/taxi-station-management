/*import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        ✖
      </button>

      <div className="sidebar.pg">
          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className="sidebar-link"><img src={dashboardIcon} alt="Dashboard Icon" className="dash-icon" /> Dashboard</NavLink>
            <NavLink to="/drivers" className="sidebar-link"><img src={driverIcon} alt="Driver Icon" className="driver-icon" />Drivers</NavLink>
            <NavLink to="/taxis" className="sidebar-link"><img src={taxiIcon} alt="Dashboard Icon" className="taxi-icon" />Taxis</NavLink>
            <NavLink to="/ride-logs" className="sidebar-link"><img src={rideIcon} alt="Dashboard Icon" className="ride-icon" />Ride Logs</NavLink>
          </nav>
    </div>
  );
};

export default Sidebar;*/




import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import dashboardIcon from "../../assets/Dashboard-icon.png";
import driverIcon from "../../assets/Driver-icon.png";
import taxiIcon from "../../assets/Taxi-icon.png";
import rideIcon from "../../assets/RideLogs-icon.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/*<button className="close-btn" onClick={toggleSidebar}>
        ✖
      </button>*/}

      <div className="content-center">
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link">
            <img src={dashboardIcon} alt="Dashboard Icon" className="sidebar-icon" /> 
            <span>Dashboard</span> 
          </NavLink>

          <NavLink to="/drivers" className="sidebar-link">
            <img src={driverIcon} alt="Driver Icon" className="sidebar-icon" /> 
            <span>Drivers</span>
          </NavLink>

          <NavLink to="/taxis" className="sidebar-link">
            <img src={taxiIcon} alt="Taxi Icon" className="sidebar-icon" /> 
            <span>Taxis</span>
          </NavLink>

          <NavLink to="/ridelogs" className="sidebar-link">
            <img src={rideIcon} alt="Ride Icon" className="sidebar-icon" /> 
            <span>Ride Logs</span>
          </NavLink>
        </nav>
      </div>  
    </div>
  );
};

export default Sidebar;

