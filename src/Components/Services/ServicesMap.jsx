import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { db } from '../../firebase-config';
import { useLocation } from 'react-router-dom';
import CTN from '../CTN/CTN';
import Footer from '../Footer/Footer';

const ServicesMap = () => {
  const [servicios, setServicios] = useState([]);
  const serviciosRef = collection(db, 'servicios');
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const serviceName = queryParams.get('serviceName');
  const scrollRef = useRef(null);

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
  }, [serviceName]);
  return (
    <div className='services_container'>
      <div className='srv_title'>
        <h1>Nuestro Servicio</h1>
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
      <section>
        <CTN />
      </section>
      <Footer />
    </div>
  );
};
export default ServicesMap;
