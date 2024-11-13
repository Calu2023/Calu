import React from 'react';
import './card_srv_flip.css';

const Card_srv_flip = ({ image, title, sub, des_1, des_2, des_3 }) => {
  const renderDescription = (text) => {
    if (typeof text !== 'string') {
      return [];
    }
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className='flip-card'>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>
          <div>
            <div className='front_items'>
              <img src={image} alt={title} width='100px' />
            </div>
            <div className='sub'>{sub}</div>
            <div className='actions'>
            <div className='agregar-carrito2'>{des_3}</div> {/* Agregar al carrito */}
            <div>{des_1}</div> {/* Ver Detalles */}

            </div>
          </div>
        </div>

        <div className='flip-card-back'>
          <div>
            <p>{renderDescription(des_1)}</p>
          </div>
          <div>
            <p>{renderDescription(des_2)}</p>
          </div>
          <div className='des_3_flip'>
            <p>{renderDescription(des_3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_srv_flip;
