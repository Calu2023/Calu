import React from "react";
import Onboarding from "./layout/Onboarding/Onboarding";
import About from "./layout/About/About";
import OurServices from "./layout/OurServices/OurServices";
import Portfolio from "./layout/Portfolio/Portfolio";
import News from "./layout/News/News";
import CTN from "./layout/CTN/CTN";
import { Header } from "../Header/header";
import Footer from "../Footer/Footer";
import Contact_button from "../Home/Contact_button/Contact_button";
import { useRef, useEffect } from "react";
import arrow_L from "../Home/icon_arrow_left.svg";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Resources from "./layout/Resources/Resources";
const AdminHome = () => {
  const navigate = useNavigate();
  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const checkAuthentication = () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/admin-login");
      }
    };

    checkAuthentication();
  }, []);

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 767;
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
        <button onClick={scrollToTop}>
          <img className="arrow_up" src={arrow_L} />
        </button>
        <Contact_button />

        <Header />
        <section ref={firstSection}>
          <Onboarding />
        </section>

        <section>
          <About />
        </section>

        <section>
          <OurServices />
        </section>

        <section>
          <Portfolio />
        </section>
        <section>
          <News />
        </section>
        <section>
          <Resources />
        </section>
        <section>
          <CTN />
          <Footer />
        </section>
      </div>
    );
  }

  return (
    <div>
      <button onClick={scrollToTop}>
        <img className="arrow_up" src={arrow_L} />
      </button>
      <Contact_button />

      <Header />
      <section ref={firstSection}>
        <Onboarding />
      </section>

      <section>
        <About />
      </section>

      <section>
        <OurServices />
      </section>

      <section>
        <Portfolio />
      </section>
      <section>
        <News />
      </section>
      <section>
        <Resources />
      </section>
      <section>
        <CTN />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default AdminHome;
