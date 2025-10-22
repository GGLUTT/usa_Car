import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bcgVideo from '../video/bcg_bmw.mp4';
import './HeroSection.css';
import TypewriterText from './TypewriterText';
import ParticleBackground from './ParticleBackground';
import FloatingElements from './FloatingElements';
import CarQuizGame from './CarQuizGame';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const typewriterTexts = [
    'імпорту авто',
    'якісних автомобілів',
    'вигідних цін',
    'надійного сервісу'
  ];

  useEffect(() => {
    // GSAP Timeline для послідовних анімацій
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      delay: 0.5
    });
    
    // Спочатку ховаємо елементи
    gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 50 });
    gsap.set(buttonsRef.current.children, { opacity: 0, y: 30 });

    // Анімація появи елементів
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.out'
    })
    .to(descRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
    }, '-=0.5')
    .to(buttonsRef.current.children, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15
    }, '-=0.4');

    // Parallax ефект при скролі
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 150,
      ease: 'none'
    });

    setIsVisible(true);
    setTextVisible(true);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <ParticleBackground />
      <FloatingElements />
      
      <video 
        className="hero-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src={bcgVideo} type="video/mp4" />
      </video>
      
      <div className="hero-overlay"></div>

      
      
      <div ref={heroRef} className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-text-container">
          <h1 ref={titleRef} className={`hero-title ${textVisible ? 'text-visible' : ''}`}>
            <span className="title-main">Розкрийте силу</span>
            <span className="title-accent">
              <TypewriterText 
                texts={typewriterTexts}
                speed={150}
                deleteSpeed={100}
                pauseTime={2000}
              />
            </span>
          </h1>
          
          <p ref={descRef} className={`hero-description ${textVisible ? 'text-visible' : ''}`}>
            Відкрийте для себе переваги імпорту вашого наступного автомобіля 
            зі Сполучених Штатів. Відчуйте неперевершені ціни, преміум якість 
            та безперебійну логістику
          </p>
          
          <div ref={buttonsRef} className={`hero-actions ${textVisible ? 'text-visible' : ''}`}>
            <button 
              className="btn-primary interactive"
              onClick={() => setIsQuizOpen(true)}
            >
              Почати
            </button>
            <button className="btn-secondary interactive">
              Дізнатися більше
            </button>
          </div>
        </div>
      </div>

      <CarQuizGame 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;