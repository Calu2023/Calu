import React, { useEffect, useState } from "react";
import "./footer.css";
import calu_logo from "../../images/icono_calu.svg";
import fb_logo from "./icons/Facebook.png";
import insta_logo from "./icons/Instagram.png";
import ld_logo from "./icons/Linkedin.png";
import tk_logo from "./icons/TikTok.png";
import sp_logo from "./icons/Spotify.png";
import yt_logo from "./icons/youtube.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import Terms from "../Cart/Terms";

const Footer = () => {
  const [modal, setModal] = useState(false);

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const [servicios, setServicios] = useState([]);
  const serviciosRef = collection(db, "servicios");
  useEffect(() => {
    const getServices = async () => {
      const data = await getDocs(serviciosRef);
      setServicios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getServices();
  }, []);

  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate("/services");
  };
  const handleModal = () => {
    navigate("terms");
  };
  if (width > breakpoint) {
    return (
      <div className="footer_container">
        <div className="footer_elements">
          <div className="logo_calu">
            <img src={calu_logo} alt="calu" />
            <p>TU AGENCIA DE MARKETING DIGITAL</p>
          </div>

          <div className="servicios">
            <h1>SERVICIOS</h1>

            <div className="servicios_">
              <ul>
                <li>
                  <span>Consultoría Estratégica</span>
                </li>
                <li>
                  <span>Gestión de Redes Sociales</span>
                </li>
                <li>
                  <span>Publicidad Digital</span>
                </li>
                <li>
                  <span>Book Institucional</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>Creación de Contenido</span>
                </li>
                <li>
                  <span>Desarrollo web</span>
                </li>
                <li>
                  <span>Modelo de Negocio</span>
                </li>
                <li>
                  <span>E-mail marketing</span>
                </li>
              
              </ul>
            </div>
                  <span className="verMasFooter" onClick={handleNavigate}>
                    Ver más
                  </span>
          </div>

          <div className="redes">
            <h1>REDES</h1>
            <div className="social_icons">
              <a
                href="https://www.linkedin.com/company/calu-mktdigital/"
                target="_blank"
              >
                <img src={ld_logo} alt="linkedin" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100090611090874"
                target="_blank"
              >
                <img src={fb_logo} alt="facebook" />
              </a>
              <a
                href="https://www.instagram.com/calu.mktdigital/ "
                target="_blank"
              >
                <img src={insta_logo} alt="instagram" />
              </a>
              <a
                href="https://www.tiktok.com/@calumktdigital?is_from_webapp=1&sender_device=pc"
                target="_blank"
              >
                <img src={tk_logo} alt="tiktok" />
              </a>
              <a
                href="https://open.spotify.com/user/31qdqqxbhaph6tshdgkoidsug6ae "
                target="_blank"
              >
                <img src={sp_logo} alt="spotify" />
              </a>
              <a href="https://youtube.com/@CaluMktdigital" target="_blank">
                <img src={yt_logo} alt="youtube" />
              </a>
            </div>
            <div className="terminos">
              <span onClick={handleModal}>
                Para saber más acerca de nuestras políticas, te recomendamos
                consultar nuestros Términos y Condiciones.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="footer_container">
      <div className="footer_elements_mobile">
        <div className="logo_calu">
          <img src={calu_logo} alt="calu" />
          <p>TU AGENCIA DE MARKETING DIGITAL</p>
        </div>

        <div className="servicios">
          <h1>SERVICIOS</h1>

          <div className="servicios_">
            <ul>
              <li>
                <span>Consultoría Estratégica</span>
              </li>
              <li>
                <span>Gestión de Redes Sociales</span>
              </li>
              <li>
                <span>Publicidad Digital</span>
              </li>
              <li>
                <span>Book Institucional</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>Creación de Contenido</span>
              </li>
              <li>
                <span>Desarrollo web</span>
              </li>
              <li>
                <span>Modelo de Negocio</span>
              </li>
              <li>
                <span>E-mail marketing</span>
              </li>
             
            </ul>
          </div>
                <span className="verMasFooter" onClick={handleNavigate}>
                  Ver más
                </span>
        </div>

        <div className="redes">
          <h1>REDES</h1>
          <div className="social_icons">
            <a
              href="https://www.linkedin.com/company/calu-mktdigital/"
              target="_blank"
            >
              <img src={ld_logo} alt="linkedin" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090611090874"
              target="_blank"
            >
              <img src={fb_logo} alt="facebook" />
            </a>
            <a href="https://www.instagram.com/calu.mktdigital/">
              <img src={insta_logo} alt="instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@calumktdigital?is_from_webapp=1&sender_device=pc"
              target="_blank"
            >
              <img src={tk_logo} alt="tiktok" />
            </a>
            <a
              href="https://open.spotify.com/user/31qdqqxbhaph6tshdgkoidsug6ae"
              target="_blank"
            >
              <img src={sp_logo} alt="spotify" />
            </a>
            <a href="https://youtube.com/@CaluMktdigital" target="_blank">
              <img src={yt_logo} alt="youtube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
