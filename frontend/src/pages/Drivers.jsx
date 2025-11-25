// src Driver.jsx
import React, { useState, useEffect } from 'react';
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from '../api/drivers.js';
import './Drivers.css';
import driverIcon from '../assets/Driver-icon.png';
import { DriversModal } from "../components/Modals/Drivers_Modals.jsx";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', telephone: '' });
  const [editId, setEditId] = useState(null);

  // Load drivers on mount
  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (err) {
      console.error('Failed to load drivers:', err);
      setDrivers([]);
    }
  };

  const openAddModal = () => {
    setForm({ name: '', telephone: '' });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const closeModal = () => {
  setAnimateOut(true); // trigger exit animation
  setTimeout(() => {
    setModalOpen(false);
    setAnimateOut(false);
  }, 300); // matches CSS animation duration
};

  const openEditModal = (driver) => {
    setForm({ name: driver.name, telephone: driver.telephone });
    setEditId(driver.id);
    setIsEditMode(true);
    setModalOpen(true);
  };


  const handleSubmit = async () => {
    if (!form.name.trim() || !form.telephone.trim()) {
      alert('Name and telephone are required!');
      return;
    }

    try {
      if (isEditMode) {
        await updateDriver(editId, form);
      } else {
        await createDriver(form);
      }
      loadDrivers();
      closeModal();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this driver?");
    if (!confirmDelete) return;

    try {
      await deleteDriver(id);
      loadDrivers();
      alert("Driver deleted successfully.");
    } catch (err) {
      console.error('Failed to delete driver:', err);
      alert("Error deleting driver.");
    }
  };


  return (
    <section className="drivers-wrapper">
      <div className="drivers-container">

        <div className='driver-header'>
          <h1 className='driver-tittle'>
          <img src={driverIcon} alt="Driver Icon" className="icon" />
          Drivers
          </h1>
          <button className="modal-open-btn" onClick={openAddModal}>➕ Add Driver</button>
        </div>
        
    
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Cellphone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(drivers) && drivers.length > 0 ? (
              drivers.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.telephone}</td>
                  <td>
                    <span className={d.status === 'active' ? 'status-active' : 'status-inactive'}>
                      ● {d.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => openEditModal(d)}>✏️</button>
                    <button onClick={() => handleDelete(d.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No drivers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


       {modalOpen && (
        <DriversModal
          isEditMode={isEditMode}
          form={form}
          setForm={setForm} 
          onSubmit={handleSubmit}
          onClose={closeModal}
          animateOut={animateOut}
        />
      )}
    </section>
  );
};

export default Drivers;
