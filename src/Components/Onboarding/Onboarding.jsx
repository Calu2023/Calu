import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Onboarding = () => {
  const [onboardingInfo, setOnboardingInfo] = useState(null);
  const [error, setError] = useState(null);

  // Utiliza useMemo para evitar cálculos innecesarios en cada renderizado.
  const onboardingDoc = useMemo(() => doc(db, 'home', 'Onboarding'), []);

  useEffect(() => {
    const getOnboarding = async () => {
      try {
        const docSnapshot = await getDoc(onboardingDoc);
        if (docSnapshot.exists()) {
          setOnboardingInfo(docSnapshot.data());
        }
      } catch (error) {
        setError(error);
      }
    };

    getOnboarding();
  }, [onboardingDoc]);

  useLayoutEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
    };

    window.addEventListener('resize', documentHeight);
    documentHeight();

    return () => window.removeEventListener('resize', documentHeight);
  }, []);

  if (error) {
    return <p>Error al cargar los datos.</p>;
  }

  // Componente separado para el contenido
  const OnboardingContent = ({ info }) => (
    <div className='parrafo'>
      {info ? (
        <>
          <h1>{info.title}</h1>
          <p>{info.t1}</p>
          <p>{info.t2}</p>
          <p>{info.t3}</p>
          <h2>{info.t4}</h2>
          <div className='contact-btn'>
            <Link to={'/contact'} onClick={() => window.scroll({ top: 0 })}>
              ¡Contáctanos!
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );

  return (
    <div className='onboarding'>
      <div className='onb_items'>
        <OnboardingContent info={onboardingInfo} />
        {onboardingInfo && (
          <img className='logoOnboard' src={onboardingInfo.Onimage} alt='logo calu' />
        )}
      </div>
      <div className='contactFlex'></div>
    </div>
  );
};

export default Onboarding;
