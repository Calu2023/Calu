import './services.css';
import { useEffect, useState, useRef, Suspense } from 'react';
import { Header } from '../Header/header';
import ContactButton from '../Home/Contact_button/Contact_button';
import arrow_L from '../Home/icon_arrow_left.webp';
import { useCustomContext } from '../../Hooks/Context/Context';
import ServicesMap from './ServicesMap';
import ServicesMapMobile from './ServicesMapMobile';

const Services = () => {
  const { cart, removeFromCart } = useCustomContext();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1024;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  //////////// Scroll to top
  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: 'smooth' });
  };
  //////////////

  return (
    <Suspense>
      <div className={width > breakpoint ? 'scroll_ctn' : 'mobileCtn'} ref={firstSection}>
        <button className='arrow_up12' onClick={scrollToTop}>
          <img className='arrow_up' src={arrow_L} alt='Arrow Up' />
        </button>
        <ContactButton />
        <Header cartItem={cart} handleDelete={removeFromCart} />;
        {width > breakpoint ? <ServicesMap /> : <ServicesMapMobile />}
      </div>
    </Suspense>
  );
};

export default Services;
