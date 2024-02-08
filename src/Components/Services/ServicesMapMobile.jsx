import { useEffect, useRef, useState } from 'react';
import Slider from '../Slider/Slider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import CardSrvFlip from './Card_srv/Card_srv_flip';
import CTN from '../CTN/CTN';
import Footer from '../Footer/Footer';

const ServicesMapMobile = () => {
  const firstSection = useRef(null);
  const scrollRef = useRef(null);
  const [servicios, setServicios] = useState([]);
  const serviciosRef = collection(db, 'servicios');
  useEffect(() => {
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
  }, []);

  return (
    <div ref={firstSection}>
      <div>
        <div className='srv_title'>
          <h1>Nuestros Servicios</h1>
        </div>
        <div className='srv-slider'>
          <section>
            <Slider>
              {servicios.map((servicios, index) => (
                <div key={index}>
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
      </div>
      <section>
        <CTN />
      </section>
      <Footer id='footer' />
    </div>
  );
};
export default ServicesMapMobile;
