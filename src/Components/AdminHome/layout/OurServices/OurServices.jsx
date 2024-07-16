import React, { useState, useEffect } from 'react';
import Slider from '../../../Slider/Slider';
import CardOur from '../../../OurServices/Card_OurService/Card_our';
import { doc, getDoc, updateDoc, getDocs, collection, query } from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import Modal from '../Modal/modal';

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [ourServicesinfo, setOurServicesinfo] = useState({});
  const [title, setTitle] = useState('');
  const [t1, setT1] = useState('');

  const getServices = async () => {
    const results = await getDocs(query(collection(db, 'servicios')));
    return results;
  };

  useEffect(() => {
    getServicesData();
    getOurServices();
  }, []);

  const getServicesData = async () => {
    const service = await getServices();
    setServices(service.docs);
  };

  const getOurServices = async () => {
    const OurDoc = doc(db, 'home', 'OurServices');
    const docSnapshot = await getDoc(OurDoc);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setOurServicesinfo(data);
      setT1(data.t1 || '');
      setTitle(data.title || '');
    }
  };

  const updateTitle = async () => {
    const our_info = doc(db, 'home', 'OurServices');
    await updateDoc(our_info, {
      title: title,
    });
    setOurServicesinfo(prev => ({ ...prev, title }));
    alert('¡Texto modificado con éxito!');
  };

  const updateT1 = async () => {
    const our_info = doc(db, 'home', 'OurServices');
    await updateDoc(our_info, {
      t1: t1,
    });
    setOurServicesinfo(prev => ({ ...prev, t1 }));
    alert('¡Texto modificado con éxito!');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = t1.slice(0, selectionStart) + '\n' + t1.slice(selectionEnd);
      setT1(newValue);
    }
  };

  const renderTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className='ourServices'>
      <div className='ourServices_text'>
        <div className='edit'>
          <h1 className='title-first-nuestros-servicios'>{ourServicesinfo.title}</h1>
          <Modal>
            <input
              style={{ width: '300px', height: '30px' }}
              type='text'
              placeholder='Ingrese título'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={updateTitle}>GUARDAR</button>
          </Modal>
        </div>

        <div className='edit'>
          <p className='text-description'>
            {renderTextWithLineBreaks(ourServicesinfo.t1 || '')}
          </p>
          <Modal>
            <textarea
              style={{ width: '300px', height: '100px', resize: 'vertical' }}
              placeholder='Ingrese texto 1'
              value={t1}
              onChange={(e) => setT1(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={updateT1}>GUARDAR</button>
          </Modal>
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
                    <img className='icono-servicios' src={service.data().img} alt='icono llave' />
                  }
                  title={service.data().title}
                  des={service.data().sub}
                  btn={''}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
