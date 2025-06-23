import React from 'react';
import './ServicesSection.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Імпорт іконок
import sedanIcon from '../images/icons/sedan.png';
import documentsIcon from '../images/icons/paper-documents.png';
import locationIcon from '../images/icons/pin-location.png';
import publicRelationIcon from '../images/icons/public-relation.png';

const ServicesSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.1);
  const [servicesRef, servicesVisible] = useScrollAnimation(0.1);

  const services = [
    {
      id: 1,
      icon: sedanIcon,
      title: 'Підбір автомобіля',
      description: 'Допоможемо знайти ідеальний автомобіль відповідно до ваших потреб та бюджету',
      features: ['Перевірка історії', 'Технічний огляд', 'Оцінка стану']
    },
    {
      id: 2,
      icon: documentsIcon,
      title: 'Оформлення документів',
      description: 'Повне юридичне супроводження та оформлення всіх необхідних документів',
      features: ['Купівля на аукціоні', 'Страхування', 'Експортні документи']
    },
    {
      id: 3,
      icon: locationIcon,
      title: 'Доставка та логістика',
      description: 'Організуємо безпечну доставку вашого автомобіля з США до України',
      features: ['Морська доставка', 'Страхування вантажу', 'Відстеження']
    },
    {
      id: 4,
      icon: publicRelationIcon,
      title: 'Розмитнення',
      description: 'Професійне розмитнення автомобіля з мінімальними витратами часу',
      features: ['Розрахунок мита', 'Подача декларації', 'Отримання номерів']
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div 
          ref={titleRef}
          className={`services-header ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="section-title">
            Наші <span className="highlight">послуги</span>
          </h2>
          <p className="services-subtitle">
            Повний цикл послуг з пригону автомобілів з США
          </p>
        </div>
        
        <div 
          ref={servicesRef}
          className={`services-grid ${servicesVisible ? 'animate-in' : ''}`}
        >
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;