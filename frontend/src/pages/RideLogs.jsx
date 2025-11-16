import React, { useState, useEffect } from 'react';
import {
  fetchRideLogs,
  addRideLog,
  fetchInactiveDrivers,
  assignDriverToRide,
  fetchInactiveTaxis,
  assignTaxiToRide,
  updateRideLog,
  deleteRideLog,
  removeDriverFromRide,
  removeTaxiFromRide,
} from '../api/ridelogs.js';
import {
  AddRideModal,
  EditRideModal,
  AssignDriverModal,
  AssignTaxiModal,
} from "../components/Modals/RideLogs_Modals.jsx";
import './RideLogs.css';
import rideIcon from '../assets/RideLogs-icon.png';

const getRideStatus = (ride) => {
  const now = new Date();
  const start = new Date(ride.start_datetime);
  const end = new Date(ride.end_datetime);
  return now >= start && now <= end ? 'active' : 'inactive';
};

const RideLogs = () => {
  const [rides, setRides] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showTaxiModal, setShowTaxiModal] = useState(false);
  const [inactiveDrivers, setInactiveDrivers] = useState([]);
  const [inactiveTaxis, setInactiveTaxis] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);

  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    start_datetime: '',
    end_datetime: ''
  });

useEffect(() => {
    loadRides();
  }, []);


const loadRides = () => {
    fetchRideLogs().then(res => setRides(res.data));
  };


const openAddModal = () => {
    setFormData({ pickup: '', dropoff: '', start_datetime: '', end_datetime: '' });
    setShowAddModal(true);
  };

  const handleAddRide = () => {
    addRideLog(formData).then(() => {
      setShowAddModal(false);
      loadRides();
    });
  };

  const openEditModal = (ride) => {
    setFormData({
      pickup: ride.pickup,
      dropoff: ride.dropoff,
      start_datetime: ride.start_datetime.slice(0, 16),
      end_datetime: ride.end_datetime.slice(0, 16)
    });
    setCurrentRide(ride);
    setShowEditModal(true);
  };

  const handleUpdateRide = () => {
    updateRideLog(currentRide.id, formData).then(() => {
      setShowEditModal(false);
      setCurrentRide(null);
      loadRides();
    });
  };

  const openDriverModal = (ride) => {
    setCurrentRide(ride);
    fetchInactiveDrivers().then(res => {
      setInactiveDrivers(res.data);
      setShowDriverModal(true);
    });
  };

  const handleAssignDriver = (driverId) => {
    assignDriverToRide(currentRide.id, { driver_id: driverId }).then(() => {
      setShowDriverModal(false);
      loadRides();
    });
  };

  const openTaxiModal = (ride) => {
    setCurrentRide(ride);
    fetchInactiveTaxis().then(res => {
      setInactiveTaxis(res.data);
      setShowTaxiModal(true);
    });
  };

  const handleAssignTaxi = (taxiId) => {
    assignTaxiToRide(currentRide.id, { taxi_id: taxiId }).then(() => {
      setShowTaxiModal(false);
      loadRides();
    });
  };

  const handleDelete = (rideId) => {
    if (window.confirm('Are you sure you want to delete this ride?')) {
      deleteRideLog(rideId).then(() => loadRides());
    }
  };

  const handleRemoveDriver = (rideId) => {
    removeDriverFromRide(rideId).then(loadRides);
  };

  const handleRemoveTaxi = (rideId) => {
    removeTaxiFromRide(rideId).then(loadRides);
  };

  return (
    
      <div className="ride-logs">

          <div className='tittle-header'>
          <h1 className="ridelog-tittle">
          <img src={rideIcon} alt="Ride Icon" className="ride-icon" />
          Rides
          </h1></div>

          <button className="add-btn" onClick={openAddModal}>➕ Add Ride</button>
        

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Start</th>
              <th>End</th>
              <th>Driver</th>
              <th>Taxi</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.map(ride => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.pickup}</td>
                <td>{ride.dropoff}</td>
                <td>{new Date(ride.start_datetime).toLocaleString()}</td>
                <td>{new Date(ride.end_datetime).toLocaleString()}</td>
                <td>
                  {ride.driver_id ? (
                    <>
                      <span className='assign-value'>ID: {ride.driver_id}</span>
                      <button onClick={() => handleRemoveDriver(ride.id)}>Remove</button>
                    </>
                  ) : (
                    <button onClick={() => openDriverModal(ride)}>Assign</button>
                  )}
                </td>
                <td>
                  {ride.taxi_id ? (
                    <>
                      <span className='assign-value'>ID: {ride.taxi_id}</span>
                      <button onClick={() => handleRemoveTaxi(ride.id)}>Remove</button>
                    </>
                  ) : (
                    <button onClick={() => openTaxiModal(ride)}>Assign</button>
                  )}
                </td>
                <td><span className={getRideStatus(ride)}>● {getRideStatus(ride)}</span></td>
                <td>
                  <button onClick={() => openEditModal(ride)}>✏️</button>
                  <button onClick={() => handleDelete(ride.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          {showAddModal && (
          <AddRideModal
            formData={formData}
            setFormData={setFormData}
            onSave={handleAddRide}
            onClose={() => setShowAddModal(false)}
          />
          )}

          {showEditModal && (
            <EditRideModal
              formData={formData}
              setFormData={setFormData}
              onUpdate={handleUpdateRide}
              onClose={() => setShowEditModal(false)}
            />
          )}

          {showDriverModal && (
            <AssignDriverModal
              inactiveDrivers={inactiveDrivers}
              onAssign={handleAssignDriver}
              onClose={() => setShowDriverModal(false)}
            />
          )}

          {showTaxiModal && (
            <AssignTaxiModal
              inactiveTaxis={inactiveTaxis}
              onAssign={handleAssignTaxi}
              onClose={() => setShowTaxiModal(false)}
            />
          )}
          
      </div>
  );
};

export default RideLogs;
