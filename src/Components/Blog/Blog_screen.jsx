import React from "react";
import Footer from "../Footer/Footer";
import CTN from "../CTN/CTN";
import Blog from "./Blog";
import "./blogScreen.css";

const Blog_Screen = () => {
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
      <div className="ctn_bs">
        <Blog />
        <CTN />
        <Footer />
      </div>
    );
  }
  return (
    <div className="ctn_bs">
      <Blog />
      <section>
        <CTN />
      </section>

      <Footer />
    </div>
  );
};

export default Blog_Screen;
