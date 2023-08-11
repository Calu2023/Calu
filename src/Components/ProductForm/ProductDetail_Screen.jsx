import React from "react";
import Footer from "../Footer/Footer";
import CTN from "../CTN/CTN";
import ProductDetail from "./ProductDetail";

const ProductDetail_Screen = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
    return (
      <div>
        <ProductDetail />
        <section>
          <CTN />
          <Footer />
        </section>
      </div>
    );
  }
  return (
    <div>
      <ProductDetail />
      <section>
        <CTN />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ProductDetail_Screen;
