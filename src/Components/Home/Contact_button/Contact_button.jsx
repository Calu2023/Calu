import icono_contacto from "./icono_contacto.png";
import "./contact_button.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hover = () => {
  return (
    <div className="text_hover_ctn">
      <h2 className="text_hover">¡Contáctanos!</h2>
    </div>
  );
};

const ContactButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerHeight = 1000; // Cambia esto a la altura a la que deseas que cambie la posición

      setIsScrolled(scrollPosition > triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={`contact_ctn ${isScrolled ? "scrolled" : ""}`}>
        <div className="contact_button_ctn">
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="contact_button"
          >
            <Link to={"/contact"}>
              <img className="contact_logo" src={icono_contacto} alt="Contact" />
            </Link>
          </div>
          {isHovering && <Hover />}
        </div>
      </div>
    </div>
  );
};

export default ContactButton;