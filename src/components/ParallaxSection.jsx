import React, { useEffect, useRef } from 'react';
import './ParallaxSection.css';

const ParallaxSection = ({ children }) => {
  const sectionRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrolled = window.pageYOffset;
      const rect = sectionRef.current.getBoundingClientRect();
      const speed1 = scrolled * 0.2;
      const speed2 = scrolled * 0.5;
      const speed3 = scrolled * 0.8;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${speed1}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${speed2}px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${speed3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="parallax-section">
      <div ref={layer1Ref} className="parallax-layer layer-1"></div>
      <div ref={layer2Ref} className="parallax-layer layer-2"></div>
      <div ref={layer3Ref} className="parallax-layer layer-3"></div>
      <div className="parallax-content">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;