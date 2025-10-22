import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounterAnimation } from '../hooks/useCounterAnimation';
import bmwG80 from '../images/rs6.png';
import g63 from '../images/g63.png';
import m4bmw from '../images/m4bmw.png';
import './AboutSection.css';

const AboutSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  
  // Counter animations for stats
  const carsCount = useCounterAnimation(500, 2000, statsVisible);
  const yearsCount = useCounterAnimation(5, 2000, statsVisible);
  const satisfactionCount = useCounterAnimation(100, 2000, statsVisible);
  const savingsCount = useCounterAnimation(40, 2000, statsVisible);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Why Choose Us?</p>
          <h2 
            ref={titleRef}
            className={`section-title ${titleVisible ? 'animate-in' : ''}`}
          >
            Надійний партнер для <br/>
            імпорту автомобілів з <span className="highlight">США</span>
          </h2>
        </div>
        
        <div 
          ref={contentRef}
          className={`about-cards ${contentVisible ? 'animate-in' : ''}`}
        >
          <div className="about-card" style={{'--delay': '0.1s'}}>
            <div className="card-image">
              <img 
              src={bmwG80} 
              alt="BMW G80" 
              />
            </div>
            <div className="card-content">
              <h3>Виняткова цінність</h3>
              <p>
                Відкрийте для себе переваги імпорту 
                вашого наступного автомобіля з США з 
                неперевершеними цінами та якістю
              </p>
              <div className="card-actions">
                <button className="btn-primary">Почати</button>
                <button className="btn-secondary">Дізнатися більше</button>
              </div>
            </div>
          </div>
          
          <div className="about-card" style={{'--delay': '0.2s'}}>
            <div className="card-image">
              <img src={g63} alt="Mercedes G63" />
            </div>
            <div className="card-content">
              <h3>Професійний сервіс</h3>
              <p>
                Наша команда експертів забезпечує 
                повний супровід процесу від пошуку 
                до доставки автомобіля
              </p>
              <div className="card-actions">
                <button className="btn-primary">Отримати пропозицію</button>
                <button className="btn-secondary">Дізнатися більше</button>
              </div>
            </div>
          </div>
          
          <div className="about-card" style={{'--delay': '0.3s'}}>
            <div className="card-image">
              <img src={m4bmw} alt="BMW M4" />
            </div>
            <div className="card-content">
              <h3>Виняткова якість</h3>
              <p>
                Насолоджуйтесь спокоєм при імпорті 
                високоякісних автомобілів з гарантією 
                професійного сервісу
              </p>
              <div className="card-actions">
                <button className="btn-primary">Почати</button>
                <button className="btn-secondary">Дізнатися більше</button>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={statsRef}
          className={`about-stats-section ${statsVisible ? 'animate-in' : ''}`}
        >
          <div className="stats-container">
            <div className="stat-card" style={{'--delay': '0.1s'}}>
              <div className="stat-number">{carsCount}+</div>
              <div className="stat-label">Пригнаних авто</div>
            </div>
            <div className="stat-card" style={{'--delay': '0.2s'}}>
              <div className="stat-number">{yearsCount}</div>
              <div className="stat-label">Років досвіду</div>
            </div>
            <div className="stat-card" style={{'--delay': '0.3s'}}>
              <div className="stat-number">{satisfactionCount}%</div>
              <div className="stat-label">Задоволених клієнтів</div>
            </div>
            <div className="stat-card" style={{'--delay': '0.4s'}}>
              <div className="stat-number">{savingsCount}%</div>
              <div className="stat-label">Середня економія</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;