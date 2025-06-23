import React, { useState, useEffect } from 'react';
import bcgVideo from '../video/bcg_bmw.mp4';
import './HeroSection.css';
import TypewriterText from './TypewriterText';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const typewriterTexts = [
    'імпорту авто',
    'якісних автомобілів',
    'вигідних цін',
    'надійного сервісу'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 300);
    const timer2 = setTimeout(() => setTextVisible(true), 800);
    const timer3 = setTimeout(() => setStatsVisible(true), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <ParticleBackground />
      
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
      
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-text-container">
          <h1 className={`hero-title ${textVisible ? 'text-visible' : ''}`}>
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
          
          <p className={`hero-description ${textVisible ? 'text-visible' : ''}`}>
            Відкрийте для себе переваги імпорту вашого наступного автомобіля 
            зі Сполучених Штатів. Відчуйте неперевершені ціни, преміум якість 
            та безперебійну логістику
          </p>
          
          <div className={`hero-actions ${textVisible ? 'text-visible' : ''}`}>
            <button className="btn-primary interactive">
              Почати
            </button>
            <button className="btn-secondary interactive">
              Дізнатися більше
            </button>
          </div>
        </div>
        
        <div className={`hero-stats ${statsVisible ? 'stats-visible' : ''}`}>
          <div className="stat">
            <div className="number">500+</div>
            <div className="label">Пригнаних авто</div>
          </div>
          <div className="stat">
            <div className="number">5</div>
            <div className="label">Років досвіду</div>
          </div>
          <div className="stat">
            <div className="number">40%</div>
            <div className="label">Економія</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;