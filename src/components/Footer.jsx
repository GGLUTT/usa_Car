import React from 'react';
import './Footer.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Footer = () => {
  const [footerRef, footerVisible] = useScrollAnimation(0.1);

  return (
    <footer 
      ref={footerRef}
      className={`footer ${footerVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-section" style={{animationDelay: '0.1s'}}>
            <h3 className="footer-title">AutoUSA</h3>
            <p className="footer-description">
              Професійний пригон автомобілів з США.
              Ваш надійний партнер у світі автомобілів.
            </p>
          </div>
          
          <div className="footer-section" style={{animationDelay: '0.2s'}}>
            <h4>Контакти</h4>
            <div className="contact-item">
              <span>📞</span>
              <span>+380 (67) 123-45-67</span>
            </div>
            <div className="contact-item">
              <span>📧</span>
              <span>info@autousa.com.ua</span>
            </div>
            <div className="contact-item">
              <span>📍</span>
              <span>Київ, Україна</span>
            </div>
          </div>
          
          <div className="footer-section" style={{animationDelay: '0.3s'}}>
            <h4>Послуги</h4>
            <ul className="footer-links">
              <li><a href="#">Пригон авто з США</a></li>
              <li><a href="#">Розмитнення</a></li>
              <li><a href="#">Доставка</a></li>
              <li><a href="#">Консультації</a></li>
            </ul>
          </div>
          
          <div className="footer-section" style={{animationDelay: '0.4s'}}>
            <h4>Соціальні мережі</h4>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Telegram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 AutoUSA. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;