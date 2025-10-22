import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSection.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
// Імпорт іконок
import sedanIcon from '../images/icons/sedan.png';
import documentsIcon from '../images/icons/paper-documents.png';
import locationIcon from '../images/icons/pin-location.png';
import publicRelationIcon from '../images/icons/public-relation.png';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [titleRef, titleVisible] = useScrollAnimation(0.1);
  const [servicesRef, servicesVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    // Анімація карток з різними напрямками
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: direction,
          opacity: 0,
          rotation: index % 2 === 0 ? -5 : 5,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out'
        });

        // Hover ефект з масштабуванням
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.08,
            y: -15,
            boxShadow: '0 20px 40px rgba(74, 144, 226, 0.3)',
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
    <section ref={sectionRef} id="services" className="services-section">
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
              ref={el => cardsRef.current[index] = el}
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