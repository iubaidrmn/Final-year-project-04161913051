import React from 'react';
import Modal from 'react-modal';
import '../assets/styles.css';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Error Modal"
      className="confirmation-modal"
      overlayClassName="confirmation-modal-overlay"
    >
      <h2>Error</h2>
      <p>{message}</p>
      <div className="popup-actions">
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ErrorMessage;
