import icono_contacto from "./icono_contacto.png";
import "./contact_button.css";
import { Link } from "react-router-dom";

import { useState, useRef } from "react";

const Hover = () => {
  return (
    <div className="text_hover_ctn">
      <h2 className="text_hover">¡Contáctanos!</h2>
    </div>
  );
};

const Contact_button = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const scrollToTop = () => {
    /*window.scrollTo({
      top: aboutSection.current.offsetTop,
      behavior: "smooth",
    });*/
  };
  return (
    <div>
      <div className="contact_ctn">
        <div className="contact_button_ctn">
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="contact_button"
          >
            <Link to={"/contact"} onClick={() => {
                      window.scroll({
                        top: 0,
                      });
                    }}>
              <img className="contact_logo" src={icono_contacto} />
            </Link>
          </div>
          {isHovering && <Hover />}
        </div>
      </div>
    </div>
  );
};

export default Contact_button;
