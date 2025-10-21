import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './FloatingElements.css';

const FloatingElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const elements = container.querySelectorAll('.floating-element');

    elements.forEach((element, index) => {
      // Випадкова початкова позиція
      gsap.set(element, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });

      // Анімація плавання
      gsap.to(element, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      });

      // Обертання
      gsap.to(element, {
        rotation: 360,
        duration: Math.random() * 20 + 20,
        repeat: -1,
        ease: 'none'
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="floating-elements">
      {[...Array(15)].map((_, index) => (
        <div key={index} className="floating-element" />
      ))}
    </div>
  );
};

export default FloatingElements;
