import React from 'react';
import './ctn.css';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase-config';
import { Link } from 'react-router-dom';
const CTN = () => {
  const [ctninfo, setCtninfo] = useState([]);

  useEffect(() => {
    const getCtn = async () => {
      const CtnDoc = doc(db, 'home', 'CTN');
      const docSnapshot = await getDoc(CtnDoc);
      if (docSnapshot.exists()) {
        setCtninfo(docSnapshot.data());
      }
    };
    getCtn();
  }, []);

  return (
    <div className='CTN_ctn'>
      <div className='CTN_ctn2'>
        <div className='edit'>
          <h1 className='CTN_title'>{ctninfo.title}</h1>
        </div>
        <button className='ctn_button'>
          <Link
            className='link_ctn'
            to={'/Contact'}
            onClick={() => {
              window.scroll({
                top: 0,
              });
            }}
          >
            {' '}
            ¡Contactanos!{' '}
          </Link>{' '}
        </button>
        <div className='ctn_p'>
          <p> {ctninfo.t1}</p>
        </div>
      </div>
    </div>
  );
};

export default CTN;
