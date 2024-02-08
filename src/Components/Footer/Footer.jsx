import React, { useEffect, useState } from 'react';
import './footer.css';
import calu_logo from '../../images/logocalu.webp';
import fb_logo from './icons/Facebook.webp';
import insta_logo from './icons/Instagram.webp';
import ld_logo from './icons/Linkedin.webp';
import tk_logo from './icons/TikTok.webp';
import sp_logo from './icons/Spotify.webp';
import yt_logo from './icons/youtube.webp';
import { useNavigate } from 'react-router-dom';

import Terms from './Terms';
const Footer = () => {
  const [modal, setModal] = useState(false);

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    // Temporizador para retrasar la renderización del footer
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 300); // Retraso de 1 segundo

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/services');
  };

  const handleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (!showFooter) {
    return null; // No renderizar nada hasta que pase 1 segundo
  }

  return (
    <div
      className={width > breakpoint ? 'filter-ctn' : 'filter-ctn-mbl'}
      id={width > breakpoint ? '' : 'footer'}
    >
      <div className='footer_container'>
        <div className={width > breakpoint ? 'footer_elements' : 'footer_elements_mobile'}>
          <div className='logo_calu'>
            <img src={calu_logo} alt='calu' />
            <p>TU AGENCIA DE MARKETING DIGITAL</p>
          </div>

          <div className='servicios'>
            <h1>SERVICIOS</h1>

            <div className='servicios_'>
              <ul>
                <li>
                  <span>Consultoría Estratégica</span>
                </li>
                <li>
                  <span>Gestión de Redes Sociales</span>
                </li>
                <li>
                  <span>Publicidad Digital</span>
                </li>
                <li>
                  <span>Book Institucional</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>Creación de Contenido</span>
                </li>
                <li>
                  <span>Desarrollo web</span>
                </li>
                <li>
                  <span>Modelo de Negocio</span>
                </li>
                <li>
                  <span>E-mail marketing</span>
                </li>
              </ul>
            </div>
            <span className='verMasFooter' onClick={handleNavigate}>
              Ver más
            </span>
          </div>

          <div className='redes'>
            <h1>REDES</h1>
            <div className='social_icons'>
              <a href='https://www.linkedin.com/company/calu-mktdigital/' target='_blank'>
                <img src={ld_logo} alt='linkedin' />
              </a>
              <a href='https://www.facebook.com/profile.php?id=100090611090874' target='_blank'>
                <img src={fb_logo} alt='facebook' />
              </a>
              <a href='https://www.instagram.com/calu.mktdigital/ ' target='_blank'>
                <img src={insta_logo} alt='instagram' />
              </a>
              <a
                href='https://www.tiktok.com/@calumktdigital?is_from_webapp=1&sender_device=pc'
                target='_blank'
              >
                <img src={tk_logo} alt='tiktok' />
              </a>
              <a href='https://open.spotify.com/user/31qdqqxbhaph6tshdgkoidsug6ae ' target='_blank'>
                <img src={sp_logo} alt='spotify' />
              </a>
              <a href='https://youtube.com/@CaluMktdigital' target='_blank'>
                <img src={yt_logo} alt='youtube' />
              </a>
              <div className='terminos'>
                <span onClick={handleModal}>
                  Para sabér más acerca de nuestras políticas, te recomendamos consultar nuestra
                  <b className='negrita'> política de privacidad</b> y datos personales.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && <Terms closeModal={closeModal} />}
    </div>
  );
};

export default Footer;
