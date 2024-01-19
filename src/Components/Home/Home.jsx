import { useState, useRef, lazy, Suspense } from 'react';
import 'animate.css/animate.min.css';
import './home.css';
import { Header } from '../Header/header';
import Footer from '../Footer/Footer';
import Contact_button from './Contact_button/Contact_button';
import React from 'react';
import arrow_L from './icon_arrow_left.svg';
import { useCustomContext } from '../../Hooks/Context/Context';

// Lazy loading de componentes
const Portfolio = lazy(() => import('../Portfolio/Portfolio'));
const About = lazy(() => import('../About/About'));
const News = lazy(() => import('../News/News'));
const Onboarding = lazy(() => import('../Onboarding/Onboarding'));
const OurServices = lazy(() => import('../OurServices/OurServices'));
const CTN = lazy(() => import('../CTN/CTN'));
const Resources = lazy(() => import('../Resources/Resources'));

const Home = () => {
  const { cart, removeFromCart } = useCustomContext();

  const sectionStyles = {
    transition: 'transform 0.5s ease-in-out',
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderContent = () => (
    <Suspense fallback={<div>Cargando...</div>}>
      <section style={sectionStyles} >
        <Onboarding />
      </section>
      <section style={sectionStyles} >
        <About />
      </section>
      <section style={sectionStyles} >
        <OurServices />
      </section>
      <section style={sectionStyles} >
        <Portfolio />
      </section>
      <section style={sectionStyles} >
        <News />
      </section>
      <section style={sectionStyles} >
        <Resources />
      </section>
      <section style={sectionStyles} >
        <CTN />
      </section>
    </Suspense>
  );

  return (
    <div className='container'  ref={firstSection}>
      <Header cartItem={cart} handleDelete={removeFromCart} />

      <button className="arrow_up12" onClick={scrollToTop}>
        <img className="arrow_up" src={arrow_L} alt="Arrow Up" />
      </button>

      <Contact_button />

      {renderContent()}

      <Footer />
    </div>
  );
};

export default Home;
