import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingOverlay.css';

const LoadingOverlay = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Блокуємо скрол під час завантаження
    document.body.style.overflow = 'hidden';
    
    const video = videoRef.current;
    
    const handleVideoEnd = () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = 'auto'; // Відновлюємо скрол
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 300);
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      
      // Якщо відео не завантажується, показуємо контент через 5 секунд
      const timeout = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = 'auto';
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 5000);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        clearTimeout(timeout);
        document.body.style.overflow = 'auto';
      };
    }
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={videoRef}
            className="loading-video"
            autoPlay
            muted
            playsInline
          >
            <source src="/load.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
