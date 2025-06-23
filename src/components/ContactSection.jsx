import React, { useState } from 'react';
import './ContactSection.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Імпорт іконок
import callIcon from '../images/icons/call.png';
import priceIcon from '../images/icons/price-tag.png';
import documentsIcon from '../images/icons/paper-documents.png';
import publicRelationIcon from '../images/icons/public-relation.png';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carModel: '',
    message: ''
  });

  // Хуки для анімацій
  const [titleRef, titleVisible] = useScrollAnimation(0.1);
  const [infoRef, infoVisible] = useScrollAnimation(0.1);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
  const [formRef, formVisible] = useScrollAnimation(0.1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Тут буде логіка відправки форми
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <div 
              ref={titleRef}
              className={`contact-title ${titleVisible ? 'animate-in' : ''}`}
            >
              <h2 className="section-title">
                Готові <span className="highlight">почати?</span>
              </h2>
            </div>
            
            <div 
              ref={infoRef}
              className={`contact-info-content ${infoVisible ? 'animate-in' : ''}`}
            >
              <p className="contact-description">
                Залиште заявку і наш менеджер зв'яжеться з вами протягом 15 хвилин
                для детальної консультації та розрахунку вартості.
              </p>
            </div>
            
            <div 
              ref={featuresRef}
              className={`contact-features ${featuresVisible ? 'animate-in' : ''}`}
            >
              <div className="contact-feature" style={{animationDelay: '0.1s'}}>
                <div className="feature-icon">
                  <img src={callIcon} alt="Безкоштовна консультація" />
                </div>
                <div className="feature-text">
                  <h4>Безкоштовна консультація</h4>
                  <p>Детальна консультація по всім питанням</p>
                </div>
              </div>
              
              <div className="contact-feature" style={{animationDelay: '0.2s'}}>
                <div className="feature-icon">
                  <img src={priceIcon} alt="Розрахунок вартості" />
                </div>
                <div className="feature-text">
                  <h4>Точний розрахунок</h4>
                  <p>Розрахунок повної вартості з усіма витратами</p>
                </div>
              </div>
              
              <div className="contact-feature" style={{animationDelay: '0.3s'}}>
                <div className="feature-icon">
                  <img src={documentsIcon} alt="Документи" />
                </div>
                <div className="feature-text">
                  <h4>Повне оформлення</h4>
                  <p>Всі документи та дозволи під ключ</p>
                </div>
              </div>
              
              <div className="contact-feature" style={{animationDelay: '0.4s'}}>
                <div className="feature-icon">
                  <img src={publicRelationIcon} alt="Підтримка" />
                </div>
                <div className="feature-text">
                  <h4>Постійна підтримка</h4>
                  <p>Супровід на всіх етапах процесу</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={formRef}
            className={`contact-form-wrapper ${formVisible ? 'animate-in' : ''}`}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Залишити заявку</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефону"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="carModel"
                  placeholder="Модель авто (необов'язково)"
                  value={formData.carModel}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Додаткова інформація"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Відправити заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;