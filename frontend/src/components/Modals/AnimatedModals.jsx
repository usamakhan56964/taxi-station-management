// src/components/AnimatedModal.jsx
import React, { useState } from "react";
import "./RideLogs_Modals.css";

const AnimatedModal = ({ children, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // match CSS duration
  };

  return (
  <div className="ride-logs-modal-wrapper">
    <div className={`ride-modal ${isClosing ? "closing" : ""}`}>
      {typeof children === "function" ? children(handleClose) : children}
    </div>
  </div>
  );
};

export default AnimatedModal;