import React from "react";
import Footer from "../Footer/Footer";
import CTN from "../CTN/CTN";
import Contact from "./Contact";
import "./contact.css";

const Contact_Screen = () => {
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
        <Contact />
        <div className="footer_contact">
          <Footer />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Contact />

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Contact_Screen;
