// src/components/Taxi_Modals.jsx
/*import React from "react";
import "./Taxi_Modals.css"; // separate CSS

export function TaxiModal({
  isEditMode,
  form,
  setForm,
  onSubmit,
  onClose,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
      >
        <h2>{isEditMode ? "Edit Taxi" : "Add Taxi"}</h2>

        <input
          type="text"
          name="number_plate"
          placeholder="Number Plate"
          value={form.number_plate}
          onChange={(e) => setForm({ ...form, number_plate: e.target.value })}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />

        <div className="modal-buttons">
          <button onClick={onSubmit}>
            {isEditMode ? "Update" : "Add"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}*/


import React, { useState } from "react";
import "./Taxi_Modals.css";

export function TaxiModal({
  isEditMode,
  form,
  setForm,
  onSubmit,
  onClose,
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // match animation duration
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{isEditMode ? "Edit Taxi" : "Add Taxi"}</h2>

        <input
          type="text"
          name="number_plate"
          placeholder="Number Plate"
          value={form.number_plate}
          onChange={(e) => setForm({ ...form, number_plate: e.target.value })}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />

        <div className="modal-buttons">
          <button onClick={onSubmit}>
            {isEditMode ? "Update" : "Add"}
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

