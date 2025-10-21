import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ContactSection.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Імпорт іконок
import callIcon from '../images/icons/call.png';
import priceIcon from '../images/icons/price-tag.png';
import documentsIcon from '../images/icons/paper-documents.png';
import publicRelationIcon from '../images/icons/public-relation.png';

// Схема валідації
const schema = yup.object({
  name: yup
    .string()
    .required("Ім'я обов'язкове")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .matches(/^[а-яА-ЯіІїЇєЄa-zA-Z\s]+$/, "Ім'я може містити тільки літери"),
  phone: yup
    .string()
    .required("Телефон обов'язковий")
    .matches(/^\+?3?8?(0\d{9})$/, "Введіть коректний номер телефону"),
  email: yup
    .string()
    .required("Email обов'язковий")
    .email("Введіть коректний email"),
  carModel: yup.string(),
  message: yup.string()
}).required();

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Хуки для анімацій
  const [titleRef, titleVisible] = useScrollAnimation(0.1);
  const [infoRef, infoVisible] = useScrollAnimation(0.1);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
  const [formRef, formVisible] = useScrollAnimation(0.1);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Симуляція відправки форми
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
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
            
            <motion.div 
              ref={featuresRef}
              className={`contact-features ${featuresVisible ? 'animate-in' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="contact-feature"
                initial={{ opacity: 0, x: -30 }}
                animate={featuresVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="feature-icon">
                  <img src={callIcon} alt="Безкоштовна консультація" />
                </div>
                <div className="feature-text">
                  <h4>Безкоштовна консультація</h4>
                  <p>Детальна консультація по всім питанням</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-feature"
                initial={{ opacity: 0, x: -30 }}
                animate={featuresVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="feature-icon">
                  <img src={priceIcon} alt="Розрахунок вартості" />
                </div>
                <div className="feature-text">
                  <h4>Точний розрахунок</h4>
                  <p>Розрахунок повної вартості з усіма витратами</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-feature"
                initial={{ opacity: 0, x: -30 }}
                animate={featuresVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="feature-icon">
                  <img src={documentsIcon} alt="Документи" />
                </div>
                <div className="feature-text">
                  <h4>Повне оформлення</h4>
                  <p>Всі документи та дозволи під ключ</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-feature"
                initial={{ opacity: 0, x: -30 }}
                animate={featuresVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="feature-icon">
                  <img src={publicRelationIcon} alt="Підтримка" />
                </div>
                <div className="feature-text">
                  <h4>Постійна підтримка</h4>
                  <p>Супровід на всіх етапах процесу</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            ref={formRef}
            className={`contact-form-wrapper ${formVisible ? 'animate-in' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={formVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <h3>Залишити заявку</h3>
              
              {submitSuccess && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✓ Заявка успішно відправлена! Ми зв'яжемося з вами найближчим часом.
                </motion.div>
              )}
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  {...register('name')}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.name.message}
                  </motion.span>
                )}
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Номер телефону"
                  {...register('phone')}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.phone.message}
                  </motion.span>
                )}
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Модель авто (необов'язково)"
                  {...register('carModel')}
                />
              </div>
              
              <div className="form-group">
                <textarea
                  placeholder="Додаткова інформація"
                  {...register('message')}
                  rows="4"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="loading-spinner">Відправка...</span>
                ) : (
                  'Відправити заявку'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;