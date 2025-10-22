import { useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import CarsSection from './components/CarsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import PromoCodeBanner from './components/PromoCodeBanner';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <ThemeProvider>
      <LoadingOverlay onLoadingComplete={() => setIsLoadingComplete(true)} />
      <div 
        className="App"
        style={{ visibility: isLoadingComplete ? 'visible' : 'hidden' }}
      >
        <PromoCodeBanner />
        <ThemeToggle />
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CarsSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;