import ProductList from "./ProductList";
import React from "react";
import Footer from "../Footer/Footer";
import CTN from "../CTN/CTN";
const Product_List = () => {
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
        <ProductList />
        <section>
          <CTN />
          <Footer />
        </section>
      </div>
    );
  }
  return (
    <div>
      <ProductList />
      <section>
        <CTN />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Product_List;
