import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AnimatedCounter.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current;
    const numberElement = numberRef.current;

    // GSAP Counter анімація
    const counter = { value: 0 };
    
    gsap.to(counter, {
      value: end,
      duration: duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      onUpdate: () => {
        setCount(Math.floor(counter.value));
      }
    });

    // Анімація масштабування та пульсації
    gsap.from(numberElement, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    // Пульсація при завершенні
    gsap.to(numberElement, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      delay: duration,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [end, duration]);

  return (
    <div ref={counterRef} className="animated-counter">
      <span ref={numberRef} className="counter-value">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    </div>
  );
};

export default AnimatedCounter;