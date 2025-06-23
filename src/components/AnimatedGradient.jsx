import React from 'react';
import './AnimatedGradient.css';

const AnimatedGradient = ({ children, variant = 'primary' }) => {
  return (
    <div className={`animated-gradient ${variant}`}>
      <div className="gradient-overlay"></div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradient;