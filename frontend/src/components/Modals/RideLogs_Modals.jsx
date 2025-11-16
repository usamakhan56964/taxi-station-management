// src/components/RideLogs_Modals.jsx
//import React from "react";
//import "./RideLogs_Modals.css";

/* ------------------- ADD RIDE MODAL ------------------- */
/*export const AddRideModal = ({ formData, setFormData, onSave, onClose }) => (
  <div className="modal">
    <h2>New Ride</h2>
    <input
      placeholder="Pickup"
      value={formData.pickup}
      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
    />
    <input
      placeholder="Dropoff"
      value={formData.dropoff}
      onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
    />
    <input
      type="datetime-local"
      value={formData.start_datetime}
      onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
    />
    <input
      type="datetime-local"
      value={formData.end_datetime}
      onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
    />
    <button className="confirm" onClick={onSave}>Save</button>
    <button onClick={onClose}>Cancel</button>
  </div>
);*/

/* ------------------- EDIT RIDE MODAL ------------------- */
/*export const EditRideModal = ({ formData, setFormData, onUpdate, onClose }) => (
  <div className="modal">
    <h2>Edit Ride</h2>
    <input
      placeholder="Pickup"
      value={formData.pickup}
      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
    />
    <input
      placeholder="Dropoff"
      value={formData.dropoff}
      onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
    />
    <input
      type="datetime-local"
      value={formData.start_datetime}
      onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
    />
    <input
      type="datetime-local"
      value={formData.end_datetime}
      onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
    />
    <button className="confirm" onClick={onUpdate}>Update</button>
    <button onClick={onClose}>Cancel</button>
  </div>
);*/

/* ------------------- ASSIGN DRIVER MODAL ------------------- */
/*export const AssignDriverModal = ({ inactiveDrivers, onAssign, onClose }) => (
  <div className="modal">
    <h2>Assign Driver</h2>
    <div className="modal-scroll">
      {inactiveDrivers.map((driver) => (
        <div key={driver.id} className="assign-list">
          <span>
            {driver.name} ({driver.telephone}) —{" "}
            <strong style={{ color: driver.status === "active" ? "red" : "green" }}>
              {driver.status}
            </strong>
          </span>
          <button onClick={() => onAssign(driver.id)}>Assign</button>
        </div>
      ))}
    </div>
    <button onClick={onClose}>Close</button>
  </div>
);*/

/* ------------------- ASSIGN TAXI MODAL ------------------- */
/*export const AssignTaxiModal = ({ inactiveTaxis, onAssign, onClose }) => (
  <div className="modal">
    <h2>Assign Taxi</h2>
    <div className="modal-scroll">
      {inactiveTaxis.map((taxi) => (
        <div key={taxi.id} className="assign-list">
          <span>
            {taxi.number_plate} ({taxi.model}) —{" "}
            <strong style={{ color: taxi.status === "active" ? "red" : "green" }}>
              {taxi.status}
            </strong>
          </span>
          <button onClick={() => onAssign(taxi.id)}>Assign</button>
        </div>
      ))}
    </div>
    <button onClick={onClose}>Close</button>
  </div>
);*/



// src/components/RideLogs_Modals.jsx
import React from "react";
import AnimatedModal from "./AnimatedModals.jsx";
import "./RideLogs_Modals.css";

/* ------------------- ADD RIDE MODAL ------------------- */
export const AddRideModal = ({ formData, setFormData, onSave, onClose }) => (
  <AnimatedModal onClose={onClose}>
    {(handleClose) => (
      <>
        <h2>New Ride</h2>
        <input
          placeholder="Pickup"
          value={formData.pickup}
          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
        />
        <input
          placeholder="Dropoff"
          value={formData.dropoff}
          onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
        />
        <input
          type="datetime-local"
          value={formData.start_datetime}
          onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
        />
        <input
          type="datetime-local"
          value={formData.end_datetime}
          onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
        />
        <button className="confirm" onClick={onSave}>Save</button>
        <button onClick={handleClose}>Cancel</button>
      </>
    )}
  </AnimatedModal>
);

/* ------------------- EDIT RIDE MODAL ------------------- */
export const EditRideModal = ({ formData, setFormData, onUpdate, onClose }) => (
  <AnimatedModal onClose={onClose}>
    {(handleClose) => (
      <>
        <h2>Edit Ride</h2>
        <input
          placeholder="Pickup"
          value={formData.pickup}
          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
        />
        <input
          placeholder="Dropoff"
          value={formData.dropoff}
          onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
        />
        <input
          type="datetime-local"
          value={formData.start_datetime}
          onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
        />
        <input
          type="datetime-local"
          value={formData.end_datetime}
          onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
        />
        <button className="confirm" onClick={onUpdate}>Update</button>
        <button onClick={handleClose}>Cancel</button>
      </>
    )}
  </AnimatedModal>
);


export const AssignDriverModal = ({ inactiveDrivers, onAssign, onClose }) => (
  <AnimatedModal onClose={onClose}>
    {(handleClose) => (
      <>
        <h2>Assign Driver</h2>

        <div className="modal-scroll">
          {inactiveDrivers.map((driver) => (
            <div key={driver.id} className="assign-list">
              <span>
                {driver.name} ({driver.telephone}) —{" "}
                <strong style={{ color: driver.status === "active" ? "red" : "green" }}>
                  {driver.status}
                </strong>
              </span>
              <button onClick={() => onAssign(driver.id)}>Assign</button>
            </div>
          ))}
        </div>

        <button onClick={handleClose}>Close</button>
      </>
    )}
  </AnimatedModal>
);

/* ------------------- ASSIGN DRIVER MODAL ------------------- */
/*export const AssignDriverModal = ({ inactiveDrivers, onAssign, onClose }) => (
  <AnimatedModal onClose={onClose}>
    {(handleClose) => (
      <>
        <h2>Assign Driver</h2>
        <div className="modal-scroll">
          {inactiveDrivers.map((driver) => (
            <div key={driver.id} className="assign-list">
              <span>
                {driver.name} ({driver.telephone}) —{" "}
                <strong style={{ color: driver.status === "active" ? "red" : "green" }}>
                  {driver.status}
                </strong>
              </span>
              <button onClick={() => onAssign(driver.id)}>Assign</button>
            </div>
          ))}
        </div>
        <button onClick={handleClose}>Close</button>
      </>
    )}
  </AnimatedModal>
);*/

/* ------------------- ASSIGN TAXI MODAL ------------------- */
/*export const AssignTaxiModal = ({ inactiveTaxis, onAssign, onClose }) => (
  <AnimatedModal onClose={onClose}>
    {(handleClose) => (
      <>
        <h2>Assign Taxi</h2>
        <div className="modal-scroll">
          {inactiveTaxis.map((taxi) => (
            <div key={taxi.id} className="assign-list">
              <span>
                {taxi.number_plate} ({taxi.model}) —{" "}
                <strong style={{ color: taxi.status === "active" ? "red" : "green" }}>
                  {taxi.status}
                </strong>
              </span>
              <button onClick={() => onAssign(taxi.id)}>Assign</button>
            </div>
          ))}
        </div>
        <button onClick={handleClose}>Close</button>
      </>
    )}
  </AnimatedModal>
);*/

export const AssignTaxiModal = ({ inactiveTaxis, onAssign, onClose }) => (
  <AnimatedModal onClose={onClose}>
    {(handleClose) => (
      <div className="assign-taxi-modal">
        {/* Header */}
        <h2>Assign Taxi</h2>

        {/* Scrollable list */}
        <div className="modal-scroll">
          {inactiveTaxis.map((taxi) => (
            <div key={taxi.id} className="assign-list">
              <span>
                {taxi.number_plate} ({taxi.model}) —{" "}
                <strong style={{ color: taxi.status === "active" ? "red" : "green" }}>
                  {taxi.status}
                </strong>
              </span>
              <button onClick={() => onAssign(taxi.id)}>Assign</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <button onClick={handleClose}>Close</button>
      </div>
    )}
  </AnimatedModal>
);