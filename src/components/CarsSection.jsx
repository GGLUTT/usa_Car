import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import './CarsSection.css';
// Імпорт зображень з галереї
import gallery1 from '../images/gallery/gallery1.jpg';
import gallery2 from '../images/gallery/gallery2.jpg';
import gallery3 from '../images/gallery/gallery3.jpg';
import gallery4 from '../images/gallery/gallery4.jpg';
import gallery5 from '../images/gallery/gallery5.jpg';
import gallery6 from '../images/gallery/gallery6.jpg';
import gallery7 from '../images/gallery/gallery7.jpg';

gsap.registerPlugin(ScrollTrigger);

const CarsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cars = [
    {
      id: 1,
      name: 'BMW M5 G90',
      image: gallery1,
      price: '$88,000',
      ukrainePrice: '₴3,600,000',
      savings: '₴800,000'
    },
    {
      id: 2,
      name: 'BMW X5',
      image: gallery2,
      price: '$40,000',
      ukrainePrice: '₴1,800,000',
      savings: '₴400,000'
    },
    {
      id: 3,
      name: 'BMW X6 M',
      image: gallery3,
      price: '$105,000',
      ukrainePrice: '₴4,200,000',
      savings: '₴1,200,000'
    },
    {
      id: 4,
      name: 'BMW X7',
      image: gallery4,
      price: '$147,500',
      ukrainePrice: '₴5,900,000',
      savings: '₴1,500,000'
    },
    {
      id: 5,
      name: 'AUDI RS7',
      image: gallery5,
      price: '$133,000',
      ukrainePrice: '₴5,320,000',
      savings: '₴1,400,000'
    },
    {
      id: 6,
      name: 'AUDI RS3',
      image: gallery6,
      price: '$44,695',
      ukrainePrice: '₴1,987,800',
      savings: '₴450,000'
    },
    {
      id: 7,
      name: 'AUDI RS6',
      image: gallery7,
      price: '$103,900',
      ukrainePrice: '₴2,856,000',
      savings: '₴550,000'
    }
  ];

  // Групуємо автомобілі по 3
  const carsPerSlide = 3;
  const totalSlides = Math.ceil(cars.length / carsPerSlide);
  
  const carGroups = [];
  for (let i = 0; i < totalSlides; i++) {
    carGroups.push(cars.slice(i * carsPerSlide, (i + 1) * carsPerSlide));
  }

  // Автоматичне перемикання
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalSlides]);

  // GSAP анімації
  useEffect(() => {
    // Анімація заголовка
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Анімація карток з 3D ефектом
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 100,
          opacity: 0,
          rotationY: 45,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out'
        });

        // Hover анімація
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -20,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    setIsVisible(true);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section ref={sectionRef} id="cars" className={`cars-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div ref={titleRef} className="section-header">
          <h2 className="section-title">
            Популярні <span className="highlight">моделі</span>
          </h2>
          <p className="section-subtitle">
            Відкрийте для себе найкращі автомобілі BMW
          </p>
        </div>
        
        <div className="carousel-container"
             onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}>
          
          <div className="carousel-wrapper">
            <div className="carousel-track" 
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carGroups.map((group, slideIndex) => (
                <div key={slideIndex} className="carousel-slide">
                  <div className="cars-grid">
                    {group.map((car, carIndex) => (
                      <Tilt
                        key={car.id}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        scale={1.02}
                        transitionSpeed={2000}
                        glareEnable={true}
                        glareMaxOpacity={0.3}
                        glareColor="#ff6b35"
                        glarePosition="all"
                      >
                        <div 
                          ref={el => cardsRef.current[slideIndex * 3 + carIndex] = el}
                          className="car-card"
                          style={{ animationDelay: `${carIndex * 0.1}s` }}
                        >
                          <div className="car-image">
                            <img src={car.image} alt={car.name} />
                            <div className="car-overlay">
                              <button className="details-btn">Детальніше</button>
                            </div>
                          </div>
                          
                          <div className="car-info">
                            <h3 className="car-name">{car.name}</h3>
                            
                            <div className="price-info">
                              <div className="price-row">
                                <span className="label">США:</span>
                                <span className="price usa">{car.price}</span>
                              </div>
                              <div className="price-row">
                                <span className="label">Україна:</span>
                                <span className="price ukraine">{car.ukrainePrice}</span>
                              </div>
                              <div className="savings">
                                <span className="savings-text">Економія: {car.savings}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tilt>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="nav-btn prev" onClick={prevSlide}>‹</button>
          <button className="nav-btn next" onClick={nextSlide}>›</button>
          
          <div className="carousel-controls">
            <div className="dots">
              {carGroups.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            <div className="slide-info">
              <span className="slide-counter">
                {currentSlide + 1} / {totalSlides}
              </span>
              <button 
                className={`auto-play-btn ${isAutoPlaying ? 'playing' : 'paused'}`}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? 'Зупинити автопрогравання' : 'Запустити автопрогравання'}
              >
                {isAutoPlaying ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
