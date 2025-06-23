import React, { useState, useEffect } from 'react';
import './TypewriterText.css';

const TypewriterText = ({ 
  texts = [], 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000,
  className = '' 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={`typewriter-text ${className}`}>
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default TypewriterText;