// src/pages/Dashboard.jsx
// Renders the dashboard metrics and recent activity feed

import React, { useEffect, useState } from 'react';
import { fetchCounts, fetchRecent } from '../api/dashboard.js';
import './Dashboard.css';
import driverIcon from '../assets/Driver-icon.png';
import taxiIcon from '../assets/Taxi-icon.png';
import rideIcon from '../assets/RideLogs-icon.png';


const Dashboard = () => {
  // State hooks for counts and recent activities
  const [counts, setCounts] = useState({
    totalDrivers: 0,
    totalTaxis: 0,
    totalRideLogs: 0
  });
  const [recent, setRecent] = useState([]);

  // On mount, load counts and recent feed
  useEffect(() => {
    // Load counts
    fetchCounts()
      .then(data => setCounts(data))
      .catch(console.error);

    // Load recent activity
    fetchRecent()
      .then(data => setRecent(data))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard-container">

      <div className='dashboard-header'><h1>Dashboard</h1></div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <img src={driverIcon} alt="Drivers" />
          <div className="metric-info">
            <h3>Total Drivers</h3>
            <h2>{counts.totalDrivers}</h2>
          </div>
        </div>

        <div className="metric-card">
          <img src={taxiIcon} alt="Taxis" />
          <div className="metric-info">
            <h3>Total Taxis</h3>
            <h2>{counts.totalTaxis}</h2>
          </div>
        </div>

        <div className="metric-card">
          <img src={rideIcon} alt="Ride Logs" />
          <div className="metric-info">
            <h3>Total Ride Logs</h3>
            <h2>{counts.totalRideLogs}</h2>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <section className="recent-activity-section">
        <div className='Activity-header'>
          <h2>Recent Activity</h2>
        </div>
        <table className="recent-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Taxi</th>
              <th>Ride ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(item => (
              <tr key={item.ride_id}>
                <td>{item.driver || 'Unassigned'}</td>
                <td>{item.taxi || 'Unassigned'}</td>
                <td>{item.ride_id}</td>
                <td>
                  {/*<span
                    className={
                      item.status === 'active'
                        ? 'status in-progress'
                        : 'status completed'
                    }
                  >
                    {item.status === 'active' ? 'In Progress' : 'Completed'}
                  </span>*/}

                <span
                    className={`status ${
                    item.status === 'active'
                    ? 'in-progress'
                    : item.status === 'completed'
                    ? 'completed'
                    : 'upcoming'
                  }`}
                >
                  {item.status === 'active'
                  ? 'In Progress'
                  : item.status === 'completed'
                  ? 'Completed'
                  : 'Upcoming'}
                </span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
