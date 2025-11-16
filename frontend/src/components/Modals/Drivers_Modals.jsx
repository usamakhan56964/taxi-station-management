

// src/components/DriversModal.jsx
import React, { useState } from "react";
import "./Taxi_Modals.css"; // ✅ now using the same CSS as Taxi

export function DriversModal({ isEditMode, form, setForm, onSubmit, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // match animation duration in CSS
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
        <h2>{isEditMode ? "Edit Driver" : "Add Driver"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          name="telephone"
          placeholder="Telephone"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
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

