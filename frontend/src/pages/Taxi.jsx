import React, { useState, useEffect } from 'react';
import taxiIcon from '../assets/Taxi-icon.png';
import { fetchTaxis, addTaxi, editTaxi, removeTaxi } from '../api/taxis.js';
import './Taxi.css';
import { TaxiModal } from "../components/Modals/Taxi_Modals.jsx";

export default function Taxis() {
  const [taxis, setTaxis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ number_plate: '', model: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const list = await fetchTaxis();
    setTaxis(list);
  }

  function openAddModal() {
    setForm({ number_plate: '', model: '' });
    setEditId(null);
    setIsEditMode(false);
    setModalOpen(true);
  }

  function openEditModal(taxi) {
    setForm({ number_plate: taxi.number_plate, model: taxi.model, status: taxi.status || 'inactive', });
    setEditId(taxi.id);
    setIsEditMode(true);
    setModalOpen(true);
  }

  function closeModal() {
    setForm({ number_plate: '', model: '' });
    setEditId(null);
    setModalOpen(false);
  }

  async function handleSubmit() {
    if (!form.number_plate.trim() || !form.model.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      if (isEditMode) {
        await editTaxi(editId, form);
      } else {
        await addTaxi({ ...form, status: 'inactive' });
      }
      load();
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  }

  async function deleteOne(id) {
    const confirmDelete = window.confirm('Delete this taxi?');
    if (!confirmDelete) return;
    await removeTaxi(id);
    load();
  }

  return (
    <section className="page-container">
      <div className="taxis">
        <div className='driver-header'>
            <h1 className='driver-tittle'>
            <img src={taxiIcon} alt="Taxi Icon" className="icon" />
            Taxis
            </h1>
             <button className="modal-open-btn" onClick={openAddModal}>➕ Add Taxi</button>
          </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plate</th>
                <th>Model</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taxis.map(taxi => (
                <tr key={taxi.id}>
                  <td>{taxi.id}</td>
                  <td>{taxi.number_plate}</td>
                  <td>{taxi.model}</td>
                  <td>
                    <span className={`status ${taxi.status}`}>
                      ● {taxi.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button onClick={() => openEditModal(taxi)}>✏️</button>
                    <button onClick={() => deleteOne(taxi.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


       {/*  Use new modal component Modal for Add/Edit Taxi */}
      {modalOpen && (
        <TaxiModal
          isEditMode={isEditMode}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
      
    </section>
  );
}
