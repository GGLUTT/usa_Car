import { useState, useEffect } from 'react';
import './Header.css';
import callIcon from '../images/icons/call.png';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            {/* Покращений логотип */}
            <div className="logo" onClick={() => scrollToSection('hero')}>
              <div className="logo-container">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="car-icon">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                  <div className="logo-glow"></div>
                </div>
                <div className="logo-text">
                  <span className="logo-main">AutoUSA</span>
                  <span className="logo-tagline">Premium Cars</span>
                </div>
              </div>
            </div>
            
            {/* Покращена навігація - тільки для десктопу */}
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <button onClick={() => scrollToSection('hero')} className="nav-link">
                    <span className="nav-text">Головна</span>
                    <div className="nav-indicator"></div>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('about')} className="nav-link">
                    <span className="nav-text">Про нас</span>
                    <div className="nav-indicator"></div>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('services')} className="nav-link">
                    <span className="nav-text">Послуги</span>
                    <div className="nav-indicator"></div>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('cars')} className="nav-link">
                    <span className="nav-text">Автомобілі</span>
                    <div className="nav-indicator"></div>
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('contact')} className="nav-link">
                    <span className="nav-text">Контакти</span>
                    <div className="nav-indicator"></div>
                  </button>
                </li>
              </ul>
            </nav>
            
            {/* Покращені дії хедера */}
            <div className="header-actions">
              <a href="tel:+380671234567" className="phone-btn">
                <div className="phone-icon-wrapper">
                  <img src={callIcon} alt="Phone" className="phone-icon" />
                  <div className="phone-pulse"></div>
                </div>
                <div className="phone-info">
                  <span className="phone-label">Зателефонувати</span>
                  <span className="phone-number">+380 (67) 123-45-67</span>
                </div>
              </a>
              <button className="cta-btn" onClick={() => scrollToSection('contact')}>
                <span className="cta-text">Безкоштовна консультація</span>
                <div className="cta-arrow">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="cta-shine"></div>
              </button>
            </div>
            
            {/* Покращена кнопка мобільного меню */}
            <button 
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="hamburger">
                <span className="line line-1"></span>
                <span className="line line-2"></span>
                <span className="line line-3"></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Декоративні елементи */}
        <div className="header-decoration">
          <div className="decoration-line decoration-line-1"></div>
          <div className="decoration-line decoration-line-2"></div>
        </div>
      </header>

      {/* Новий мобільний меню компонент */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
};

export default Header;