import React from "react";
import Modal from "react-modal";
import "../assets/styles.css";

const SuccessMessage = ({ message, onClose, onGoToHomepage, onAddAnother }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      className="confirmation-modal"
      overlayClassName="confirmation-modal-overlay"
    >
      <h2>Success</h2>
      <p>{message}</p>
      <div className="popup-actions">
        <button onClick={onGoToHomepage}>OK</button>
        {onAddAnother && <button onClick={onAddAnother}>Continue</button>}
      </div>
    </Modal>
  );
};

export default SuccessMessage;
