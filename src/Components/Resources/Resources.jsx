import React from 'react';
import './resources.css';
import Slider from '../Slider/Slider';
import { Link } from 'react-router-dom';
import CardsMap from './CardsMap';

const Resources = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1280;

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <div className='res_ctn'>
      <div className='res_items'>
        <h1 className='res_title_adm'>RECURSOS PARA TU NEGOCIO</h1>
        {width > breakpoint ? (
          <div className='res_card'>
            <CardsMap />
          </div>
        ) : (
          <Slider>
            <CardsMap />
          </Slider>
        )}
        <Link
          className='btn_res_more'
          to={'/product-list/'}
          onClick={() => {
            window.scroll({
              top: 0,
            });
          }}
        >
          <div className='verMas'>Ver Más</div>
        </Link>
      </div>
    </div>
  );
};
export default Resources;
