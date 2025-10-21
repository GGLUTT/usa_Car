import { useState, useEffect } from 'react';
import { Gift, X, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';
import './PromoCodeBanner.css';

const PromoCodeBanner = () => {
  const [promoData, setPromoData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Перевіряємо чи є промокод в localStorage
    const checkPromo = () => {
      const saved = localStorage.getItem('carQuizPromo');
      if (saved) {
        const data = JSON.parse(saved);
        const promoDate = new Date(data.date);
        const now = new Date();
        const daysDiff = (now - promoDate) / (1000 * 60 * 60 * 24);
        
        // Перевіряємо чи промокод ще дійсний (30 днів)
        if (daysDiff <= 30) {
          setPromoData(data);
          setIsVisible(true);
          
          // Анімація появи з правого боку
          setTimeout(() => {
            gsap.fromTo('.promo-banner',
              { x: 100, opacity: 0, scale: 0.9 },
              { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
            );
          }, 1000);
        } else {
          // Видаляємо застарілий промокод
          localStorage.removeItem('carQuizPromo');
        }
      }
    };

    checkPromo();
    
    // Перевіряємо кожні 5 секунд (якщо користувач отримав промокод в іншій вкладці)
    const interval = setInterval(checkPromo, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    gsap.to('.promo-banner', {
      x: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setIsVisible(false)
    });
  };

  const handleCopy = () => {
    if (promoData) {
      navigator.clipboard.writeText(promoData.code).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  if (!isVisible || !promoData) return null;

  return (
    <div className="promo-banner">
      <div className="promo-banner-content">
        <Gift className="promo-banner-icon" size={24} />
        <div className="promo-banner-text">
          <span className="promo-banner-title">Знижка 5%</span>
          <span className="promo-banner-code">{promoData.code}</span>
        </div>
        <button 
          className="promo-banner-copy" 
          onClick={handleCopy}
          title="Копіювати"
        >
          {isCopied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <button 
          className="promo-banner-close" 
          onClick={handleClose}
          title="Сховати"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default PromoCodeBanner;
