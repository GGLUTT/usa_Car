import React, { useState } from 'react';
import './MorphingIcon.css';

const MorphingIcon = ({ type = 'menu' }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`morphing-icon ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {type === 'menu' && (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            className="line line1"
            d="M5,7 L25,7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="line line2"
            d="M5,15 L25,15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="line line3"
            d="M5,23 L25,23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'heart' && (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            className="heart-path"
            d="M15,27 C15,27 3,19 3,11 C3,7 6,4 10,4 C12,4 14,5 15,7 C16,5 18,4 20,4 C24,4 27,7 27,11 C27,19 15,27 15,27 Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

export default MorphingIcon;