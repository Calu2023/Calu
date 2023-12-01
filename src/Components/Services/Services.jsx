import './services.css';
import { useEffect, useState, useRef } from 'react';
import { Header } from '../Header/header';
import CardSrvFlip from './Card_srv/Card_srv_flip';
import Footer from '../Footer/Footer';
import CTN from '../CTN/CTN';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ContactButton from '../Home/Contact_button/Contact_button';
import arrow_L from '../Home/icon_arrow_left.svg';
import { useCustomContext } from '../../Hooks/Context/Context';
import { useLocation } from 'react-router';
import Slider from '../Portfolio/Slider/Slider';


const Services = () => {
  const { cart, removeFromCart } = useCustomContext();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1024;
  const [servicios, setServicios] = useState([]);
  const serviciosRef = collection(db, 'servicios');
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const serviceName = queryParams.get('serviceName');
  const scrollRef = useRef(null);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    const getPosts = async () => {
      const data = await getDocs(serviciosRef);
      setServicios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      setTimeout(() => {
        if (scrollRef.current) {
          console.log(scrollRef);
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };
    getPosts();
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [serviceName]);

  //////////// Scroll to top
  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: 'smooth' });
  };
  //////////////

  if (width > breakpoint) {
    return (
      <div className="scroll_ctn" ref={firstSection}>
        <button className="arrow_up12" onClick={scrollToTop}>
          <img className="arrow_up" src={arrow_L} alt="Arrow Up" />
        </button>
        <ContactButton />
        <Header cartItem={cart} handleDelete={removeFromCart} />;
        <div className='services_container'>
          <div className='srv_title'>
            <h1>Nuestros Servicios</h1>
          </div>
          <div>
            {servicios.map((servicio, index) => {
              return (
                <div
                  className='srv_section'
                  key={index}
                  ref={serviceName === servicio.title ? scrollRef : null}
                >
                  <div className='srv_content'>
                    <div className={index % 2 === 0 ? 'card_srv_cont' : 'card_srv_cont_inv'}>
                      <div className={index % 2 === 0 ? 'card_srv_info' : 'card_srv_info_inv'}>
                        <div className='title_srv'>
                          <h1>{servicio.title}</h1>
                        </div>
                        <div className='sub_d'>
                          <h2>{servicio.sub}</h2>
                        </div>
                        <div className='des_1d'>
                          <p>{servicio.des_1}</p>
                        </div>
                        <br />
                        <div className='des_2d'>
                          <p>{servicio.des_2}</p>
                        </div>

                        <div className='des_3d'>
                          <p>{servicio.des_3}</p>
                        </div>
                      </div>
                      <div className='srv_icon'>
                        <div>
                          <img src={servicio.img} alt={servicio.img} width='210px' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <section>
          <CTN />
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <>

      <div className="mobileCtn" ref={firstSection}>
        <button className="arrow_up12" onClick={scrollToTop}>
          <img className="arrow_up" src={arrow_L} alt="Arrow Up" />

        </button>
        <ContactButton />
        <Header cartItem={cart} handleDelete={removeFromCart} />
        <div ref={firstSection}>
          <div>
            <div className='srv_title'>
              <h1>Nuestros Servicios</h1>
            </div>
            <section>
              <Slider>
                {servicios.map((servicios, index) => (
                  <div   key={index}>
                    <CardSrvFlip
                      image={servicios.img}
                      title={servicios.title}
                      sub={servicios.sub}
                      des_1={servicios.des_1}
                      des_2={servicios.des_2}
                      des_3={servicios.des_3}
                    ></CardSrvFlip>
                  </div>
                ))}
              </Slider>
            </section>
          </div>
          <section>
            <CTN />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Services;
