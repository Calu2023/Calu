import Slider from '../Slider/Slider';
import './OurServices.css';
import CardOur from './Card_OurService/Card_our';
import React, { Suspense, useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { Link } from 'react-router-dom';

const OurServices = () => {
  const [ourServicesinfo, setOurServicesinfo] = useState({});
  const [services, setServices] = useState([]);

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

  const getServices = async () => {
    const results = await getDocs(query(collection(db, 'servicios')));
    return results;
  };

  useEffect(() => {
    const getServicesData = async () => {
      const service = await getServices();
      setServices(service.docs);
    };
    getServicesData();
  }, []);

  const renderTextWithLineBreaks = (text) => {
    if (!text) return null; // Manejar el caso donde text es undefined o null
  
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  

  return (
    <Suspense>
      <div className='ourServices'>
        <div className='ourServices_text'>
          <div className='edit'>
            <h1 className='title-first-nuestros-servicios'>{ourServicesinfo.title}</h1>
          </div>

          <div className='edit'>
            <p className='text-description'>{renderTextWithLineBreaks(ourServicesinfo.t1)}</p>
          </div>
        </div>
        <div className='ctn-servicios'>
          <div className='slider'>
            <Slider>
              {services &&
                services.map((service, index) => (
                  <CardOur
                    key={index}
                    image={
                      <img
                        className='icono-servicios'
                        src={service.data().img}
                        alt='icono llave'
                      />
                    }
                    title={service.data().title}
                    des={service.data().sub}
                    btn={
                      <Link
                        onClick={() => {
                          window.scroll({
                            top: 0,
                          });
                        }}
                        className='button_portfolio'
                        to={`/services?serviceName=${service.data().title}`}
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
