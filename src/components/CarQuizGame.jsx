import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Trophy, 
  Clock, 
  Zap, 
  Target, 
  Award, 
  Star, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  RotateCcw,
  X,
  Flame,
  TrendingUp,
  Car,
  Gift,
  Copy,
  Check
} from 'lucide-react';
import './CarQuizGame.css';

const CarQuizGame = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [promoCode, setPromoCode] = useState(null);
  const [isPromoCopied, setIsPromoCopied] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const questions = [
    {
      question: "Яка країна є батьківщиною бренду BMW?",
      answers: ["Німеччина", "США", "Японія", "Італія"],
      correct: 0,
      fact: "BMW розшифровується як Bayerische Motoren Werke (Баварські моторні заводи)",
      difficulty: "easy"
    },
    {
      question: "У якому році був заснований бренд Ford?",
      answers: ["1903", "1925", "1891", "1950"],
      correct: 0,
      fact: "Ford Motor Company була заснована Генрі Фордом у 1903 році",
      difficulty: "medium"
    },
    {
      question: "Який автомобіль вважається першим серійним електромобілем Tesla?",
      answers: ["Model S", "Model 3", "Roadster", "Model X"],
      correct: 2,
      fact: "Tesla Roadster (2008) був першим серійним електромобілем компанії",
      difficulty: "medium"
    },
    {
      question: "Яка максимальна швидкість Bugatti Chiron?",
      answers: ["380 км/год", "420 км/год", "490 км/год", "350 км/год"],
      correct: 1,
      fact: "Bugatti Chiron може розганятися до 420 км/год",
      difficulty: "hard"
    },
    {
      question: "Який бренд використовує слоган 'The Ultimate Driving Machine'?",
      answers: ["Mercedes-Benz", "BMW", "Audi", "Porsche"],
      correct: 1,
      fact: "BMW використовує цей слоган з 1970-х років",
      difficulty: "easy"
    },
    {
      question: "Скільки циліндрів у двигуні W16 Bugatti Veyron?",
      answers: ["12", "16", "8", "10"],
      correct: 1,
      fact: "W16 - це унікальна конфігурація з 16 циліндрами у формі W",
      difficulty: "hard"
    },
    {
      question: "Яка компанія володіє брендами Lamborghini, Audi та Porsche?",
      answers: ["BMW Group", "Volkswagen Group", "Daimler AG", "Fiat Chrysler"],
      correct: 1,
      fact: "Volkswagen Group - один з найбільших автомобільних концернів світу",
      difficulty: "medium"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.quiz-modal', 
        { scale: 0.8, opacity: 0, rotateX: -15 },
        { scale: 1, opacity: 1, rotateX: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
      setTimeLeft(15);
      setTotalTime(0);
    }
  }, [isOpen]);

  // Timer effect
  useEffect(() => {
    if (isOpen && !showResult && !gameFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
        setTotalTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, showResult, gameFinished, timeLeft]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [currentQuestion, questions.length]);

  const handleTimeOut = () => {
    setSelectedAnswer(-1);
    setShowResult(true);
    setStreak(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };


  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      
      // Конфетті ефект
      createConfetti();
    } else {
      setStreak(0);
    }
    
    setShowResult(true);
  };

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.3 + 's';
      document.querySelector('.quiz-modal')?.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 1000);
    }
  };

  const generatePromoCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AUTO';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      gsap.to('.question-container', {
        x: -100,
        opacity: 0,
        rotateY: -15,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setTimeLeft(15);
          gsap.fromTo('.question-container',
            { x: 100, opacity: 0, rotateY: 15 },
            { x: 0, opacity: 1, rotateY: 0, duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    } else {
      // Перевірка на знижку (90%+ правильних відповідей)
      const accuracy = (score / questions.length) * 100;
      if (accuracy >= 90) {
        const code = generatePromoCode();
        setPromoCode(code);
        // Зберігаємо в localStorage
        localStorage.setItem('carQuizPromo', JSON.stringify({
          code: code,
          date: new Date().toISOString(),
          score: score,
          total: questions.length
        }));
      }
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setTimeLeft(15);
    setStreak(0);
    setTotalTime(0);
    setPromoCode(null);
    setIsPromoCopied(false);
  };

  const copyPromoCode = () => {
    if (promoCode) {
      navigator.clipboard.writeText(promoCode).then(() => {
        setIsPromoCopied(true);
        setTimeout(() => setIsPromoCopied(false), 2000);
      });
    }
  };

  const handleClose = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    gsap.to('.quiz-modal', {
      scale: 0.8,
      opacity: 0,
      rotateX: 15,
      duration: 0.3,
      onComplete: () => {
        onClose();
        handleRestart();
      }
    });
  };

  const getTimeColor = () => {
    if (timeLeft > 10) return '#10b981';
    if (timeLeft > 5) return '#f59e0b';
    return '#ef4444';
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quiz-overlay" onClick={handleClose}>
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close" onClick={handleClose}>
          <X size={24} />
        </button>
        
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div ref={progressRef} className="progress-bar-fill"></div>
        </div>
        
        {!gameFinished ? (
          <>
            <div className="quiz-header">
              <div className="header-title">
                <Car className="header-icon" size={32} />
                <h2>Автомобільна Вікторина</h2>
              </div>
              
              <div className="stats-container">
                <div className="stat-item">
                  <Target size={20} />
                  <span>{currentQuestion + 1} / {questions.length}</span>
                </div>
                
                <div className="stat-item">
                  <Trophy size={20} />
                  <span>{score}</span>
                </div>
                
                {streak > 0 && (
                  <div className="stat-item streak-badge">
                    <Flame size={20} />
                    <span>{streak}x</span>
                  </div>
                )}
                
                <div className="stat-item timer" style={{ color: getTimeColor() }}>
                  <Clock size={20} />
                  <span>{timeLeft}s</span>
                </div>
              </div>
              
              <div className="difficulty-badge" 
                   style={{ backgroundColor: getDifficultyColor(questions[currentQuestion].difficulty) }}>
                {questions[currentQuestion].difficulty === 'easy' && 'Легко'}
                {questions[currentQuestion].difficulty === 'medium' && 'Середньо'}
                {questions[currentQuestion].difficulty === 'hard' && 'Складно'}
              </div>
            </div>

            <div className="question-container">
              <h3 className="question-text">{questions[currentQuestion].question}</h3>
              
              <div className="answers-grid">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    className={`answer-btn answer-btn-${index} ${
                      selectedAnswer === index ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                  >
                    {answer}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="result-container">
                  <div className={`result-header ${
                    selectedAnswer === questions[currentQuestion].correct 
                      ? 'correct' 
                      : 'incorrect'
                  }`}>
                    {selectedAnswer === questions[currentQuestion].correct ? (
                      <>
                        <CheckCircle2 size={32} />
                        <span>Правильно!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={32} />
                        <span>{selectedAnswer === -1 ? 'Час вийшов!' : 'Неправильно'}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="fact-container">
                    <Star className="fact-icon" size={20} />
                    <p className="fact-text">{questions[currentQuestion].fact}</p>
                  </div>
                  
                  <button className="next-btn" onClick={handleNext}>
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        <span>Наступне питання</span>
                        <ChevronRight size={20} />
                      </>
                    ) : (
                      <>
                        <span>Завершити</span>
                        <Trophy size={20} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="final-result">
            <div className="final-header">
              <Trophy className="final-trophy" size={64} />
              <h2>Гра завершена!</h2>
            </div>
            
            <div className="final-stats-grid">
              <div className="final-stat">
                <Award size={32} />
                <div className="stat-content">
                  <span className="stat-value">{score} / {questions.length}</span>
                  <span className="stat-label">Правильних відповідей</span>
                </div>
              </div>
              
              <div className="final-stat">
                <Flame size={32} />
                <div className="stat-content">
                  <span className="stat-value">{bestStreak}</span>
                  <span className="stat-label">Найкраща серія</span>
                </div>
              </div>
              
              <div className="final-stat">
                <Clock size={32} />
                <div className="stat-content">
                  <span className="stat-value">{totalTime}s</span>
                  <span className="stat-label">Загальний час</span>
                </div>
              </div>
              
              <div className="final-stat">
                <TrendingUp size={32} />
                <div className="stat-content">
                  <span className="stat-value">{Math.round((score / questions.length) * 100)}%</span>
                  <span className="stat-label">Точність</span>
                </div>
              </div>
            </div>
            
            <div className="performance-message">
              {score === questions.length && (
                <>
                  <Trophy size={24} />
                  <p>Ідеально! Ви справжній автомобільний експерт!</p>
                </>
              )}
              {score >= questions.length * 0.7 && score < questions.length && (
                <>
                  <Award size={24} />
                  <p>Чудовий результат! Продовжуйте в тому ж дусі!</p>
                </>
              )}
              {score >= questions.length * 0.4 && score < questions.length * 0.7 && (
                <>
                  <Star size={24} />
                  <p>Непоганий результат! Є куди рости!</p>
                </>
              )}
              {score < questions.length * 0.4 && (
                <>
                  <Zap size={24} />
                  <p>Спробуйте ще раз! Практика робить майстра!</p>
                </>
              )}
            </div>
            
            {promoCode && (
              <div className="promo-code-container">
                <div className="promo-header">
                  <Gift size={28} className="promo-icon" />
                  <div className="promo-text">
                    <h3>Вітаємо! Ви отримали знижку 5%!</h3>
                    <p>Використайте цей промокод при замовленні наших послуг</p>
                  </div>
                </div>
                <div className="promo-code-box">
                  <span className="promo-code">{promoCode}</span>
                  <button 
                    className="copy-btn" 
                    onClick={copyPromoCode}
                    title="Копіювати промокод"
                  >
                    {isPromoCopied ? (
                      <>
                        <Check size={20} />
                        <span>Скопійовано!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={20} />
                        <span>Копіювати</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="promo-note">
                  Промокод збережено! Ви можете використати його протягом 30 днів.
                </p>
              </div>
            )}
            
            <div className="final-actions">
              <button className="restart-btn" onClick={handleRestart}>
                <RotateCcw size={20} />
                <span>Грати знову</span>
              </button>
              <button className="close-btn" onClick={handleClose}>
                <X size={20} />
                <span>Закрити</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarQuizGame;
