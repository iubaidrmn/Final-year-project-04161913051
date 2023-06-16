import React from 'react';
import '../assets/styles.css'; // Import the CSS file for the loading spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
