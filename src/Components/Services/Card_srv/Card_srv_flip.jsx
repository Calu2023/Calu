import React from 'react';
import './card_srv_flip.css';

const Card_srv_flip = ({ image, title, sub, des_1, des_2, des_3 }) => {
  const handleClick = () => {};

  return (
    <div class='flip-card'>
      <div class='flip-card-inner'>
        <div class='flip-card-front'>
          <div>
            {' '}
            <img src={image} alt={image} width='210px' />
          </div>
          <div className='title'>{title}</div>
          <br />
          <div className='sub'>{sub}</div>
        </div>

        <div class='flip-card-back'>
          <div>
            <p>{des_1}</p>
          </div>

          <div>
            <p>{des_2}</p>
          </div>

          <div className='des_3'>
            <p>{des_3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_srv_flip;
