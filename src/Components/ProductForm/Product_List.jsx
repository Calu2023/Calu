import ProductList from "./ProductList";
import React from "react";
import Footer from "../Footer/Footer";
import CTN from "../CTN/CTN";
import "./product_list.css";
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
      <div className="pl_ctn">
        <ProductList />
        <section>
          <CTN />
          <Footer />
        </section>
      </div>
    );
  }
  return (
    <div className="pl_ctn">
      <ProductList />
      <section>
        <CTN />
      </section>

      <Footer />
    </div>
  );
};

export default Product_List;
