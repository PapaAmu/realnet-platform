import React from 'react';
import './buttons.css';

const SecondaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`secondary-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
