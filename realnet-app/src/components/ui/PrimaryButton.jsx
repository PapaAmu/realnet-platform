import React from 'react';
import './buttons.css';

const PrimaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`primary-btn ${className}`}
    >
      <div className="primary-btn-content">
        {children}
      </div>
    </button>
  );
};

export default PrimaryButton;
