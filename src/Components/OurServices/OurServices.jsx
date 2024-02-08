import Slider from '../Slider/Slider';
import './OurServices.css';
import CardOur from './Card_OurService/Card_our';
import { Suspense, useState } from 'react';
import { doc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase-config';
import { Link } from 'react-router-dom';

const OurServices = () => {
  const [ourServicesinfo, setOurServicesinfo] = useState([]);
  /// TEXTOS
  useEffect(() => {
    const getOurServices = async () => {
      const OurDoc = doc(db, 'home', 'OurServices');
      const docSnapshot = await getDoc(OurDoc);
      if (docSnapshot.exists()) {
        setOurServicesinfo(docSnapshot.data());
      }
    };
    getOurServices();
  }, []);
  ///// GET SERVICIOS
  const [services, setServices] = useState([]);

  const getServices = async () => {
    const results = await getDocs(query(collection(db, 'servicios')));
    return results;
  };
  useEffect(() => {
    getServicesData();
  }, []);

  const getServicesData = async () => {
    const service = await getServices();

    setServices(service.docs);
  };
  ////////////////////////
  return (
    <Suspense>
      <div className='ourServices'>
        <div className='ourServices_text'>
          <div className='edit'>
            <h1 className='title-first-nuestros-servicios'>{ourServicesinfo.title}</h1>
          </div>

          <div className='edit'>
            <p className='text-description'>{ourServicesinfo.t1}</p>
          </div>
        </div>
        <div className='ctn-servicios'>
          <div className='slider'>
            <Slider>
              {services &&
                services.map((services, index) => (
                  <CardOur
                    key={index}
                    image={
                      <img
                        className='icono-servicios'
                        src={services.data().img}
                        alt='icono llave'
                      />
                    }
                    title={services.data().title}
                    des={services.data().sub}
                    btn={
                      <Link
                        onClick={() => {
                          window.scroll({
                            top: 0,
                          });
                        }}
                        className='button_portfolio'
                        to={`/services?serviceName=${services.data().title}`}
                      >
                        Ver más
                      </Link>
                    }
                  ></CardOur>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default OurServices;
