import React, { useState, useEffect } from 'react';
import './about.css';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import AboutContent from './AboutContent';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState({});

  useEffect(() => {
    const fetchAboutInfo = async () => {
      const aboutDocRef = doc(db, 'home', 'About');
      const docSnap = await getDoc(aboutDocRef);
      if (docSnap.exists()) {
        setAboutInfo(docSnap.data());
      }
    };

    fetchAboutInfo();
  }, []);

  return (
    <div className='sec'>
      <AboutContent info={aboutInfo} />
    </div>
  );
};

export default About;
