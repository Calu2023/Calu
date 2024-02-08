import ProductList from './ProductList';
import React, { Suspense } from 'react';
import Footer from '../Footer/Footer';
import CTN from '../CTN/CTN';
import './product_list.css';
const Product_List = () => {
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
    <Suspense>
      <div className='pl_ctn'>
        <ProductList />
        {width > breakpoint ? (
          <section>
            <CTN />
            <Footer />
          </section>
        ) : (
          <>
            <section>
              <CTN />
            </section>

            <Footer />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default Product_List;
