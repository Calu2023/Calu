import React from 'react';
import Footer from '../Footer/Footer';
import CTN from '../CTN/CTN';
import ProductDetail from './ProductDetail';
import './product-detail.css';

const ProductDetail_Screen = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
  return (
    <div className='pd_ctn'>
      <ProductDetail />
      {width > breakpoint ? (
        <>
          <CTN />
          <Footer />
        </>
      ) : (
        <>
          <section>
            <CTN />
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};

export default ProductDetail_Screen;
