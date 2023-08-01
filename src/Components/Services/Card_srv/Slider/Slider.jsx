import React from 'react';
import './slider.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Slider({ children }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='carousel'>
      <Carousel
        containerClass='carousel-container'
        swipeable={true}
        draggable={true}
        removeArrowOnDeviceType={['mobile', 'tablet']}
        infinite={true}
        responsive={responsive}
        showDots={true}
        itemClass='carouselItem'
        autoplay={true}
        autoplaySpeed={'4500'}
      >
        {children.map((children, index) => {
          return <div key={index}>{children}</div>;
        })}
      </Carousel>
    </div>
  );
}

export default Slider;
