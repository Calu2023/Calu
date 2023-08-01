import icono2 from "../../../Services/icons/publicidad_digital.png";
import icono from "../../../Services/icons/gestion_redes.png";
import icono3 from "../../../Services/icons/consultoria_estrategica.png";
import email_mark from "../../../Services/icons/email_marketing.png";
import book from "../../../Services/icons/book_institucional.png";
import modelo from "../../../Services/icons/modelo_negocio.png";
import creacion from "../../../Services/icons/creación_contenido.png";
import desarrollo from "../../../Services/icons/desarrollo_web.png";
import Slider from "../../../Portfolio/Slider/Slider";

import Card_our from "./Card_OurService/Card_our";
import { useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../../firebase-config";
import Modal from "../Modal/modal";

const OurServices = () => {
  /*setDoc(doc(db, "home", "OurServices"), {
    title: "NUESTROS SERVICIOS",
    t1: "Contamos con una amplia gama de servicios diseñados a la medida de cada emprendimiento que quiera tener éxito en el mundo digital.",

  });*/
  ///////////////////////////////////
  const [ourServicesinfo, setOurServicesinfo] = useState([]);
  /////////////////////////////////

  const [title, setTitle] = useState("");
  const [t1, setT1] = useState("");

  const updateTitle = async () => {
    const our_info = doc(db, "home", "OurServices");
    await updateDoc(our_info, {
      title: title,
    });
    alert("¡ Texto modificado con exito !");
  };

  const updateT1 = async () => {
    const our_info = doc(db, "home", "OurServices");
    await updateDoc(our_info, {
      t1: t1,
    });
    alert("¡ Texto modificado con exito !");
  };

  useEffect(() => {
    const getOurServices = async () => {
      const OurDoc = doc(db, "home", "OurServices");
      const docSnapshot = await getDoc(OurDoc);
      if (docSnapshot.exists()) {
        setOurServicesinfo(docSnapshot.data());
      }
    };
    getOurServices();
  }, []);

  return (
    <div className="ourServices">
      <div className="ourServices_text">
        <div className="edit">
          <h1 className="title-first-nuestros-servicios">
            {ourServicesinfo.title}
          </h1>
          <Modal>
            <input
              style={{ width: "300px", height: "30px" }}
              type="text"
              placeholder="Ingrese titulo"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={() => updateTitle()}>GUARDAR</button>
          </Modal>
        </div>

        <div className="edit">
          <p className="text-description">{ourServicesinfo.t1}</p>
          <Modal>
            <input
              style={{ width: "300px", height: "30px" }}
              type="text"
              placeholder="Ingrese texto 1"
              onChange={(e) => setT1(e.target.value)}
            />
            <button onClick={() => updateT1()}>GUARDAR</button>
          </Modal>
        </div>
      </div>
      <div className="ctn-servicios">
        <div className="slider">
          <Slider>
            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={icono3}
                    alt="icono pay"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    CONSULTORIA ESTRATEGICA
                    <p className="paragraph">
                      ¿Sentís que tu marca no despega?
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>
            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={icono}
                    alt="icono ojo"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    GESTIÓN DE REDES SOCIALES
                    <p className="paragraph">
                      Te ayudamos a identificar tu público ideal
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>
            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={icono2}
                    alt="icono llave"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    PUBLICIDAD DIGITAL
                    <p className="paragraph">
                      Creamos tus campañas de publicidad
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>
            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={email_mark}
                    alt="icono llave"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    E-MAIL MARKETING
                    <p className="paragraph">
                      Te ayudamos a mantener una relación mas cercana con las
                      personas que ya se interesaron en tu marca.
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>
            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={book}
                    alt="icono llave"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    BOOK INSTITUCIONAL
                    <p className="paragraph">
                      Le damos vida a tu negocio con fotografías y videos de
                      alta calidad
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>

            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={creacion}
                    alt="icono llave"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    CREACIÓN DE CONTENIDO
                    <p className="paragraph">
                      Creamos increíbles experiencias con contenidos creativos
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>
            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={modelo}
                    alt="icono llave"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    MODELO DE NEGOCIO
                    <p className="paragraph">
                      Le damos forma a tu idea y te ayudamos a que se convierta
                      en realidad
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>

            <div className="nuestros-servicios">
              <Card_our
                image={
                  <img
                    className="icono-servicios"
                    src={desarrollo}
                    alt="icono llave"
                  />
                }
                title={
                  <p className="text-icono-servicios">
                    DESARROLLO WEB
                    <p className="paragraph">
                      Desarrollamos una página web de alto impacto visual que
                      permita ofrecer la mejor experiencia
                    </p>
                  </p>
                }
                btn={
                  <a className=" button_portfolio" href="/services">
                    Ver más
                  </a>
                }
              ></Card_our>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default OurServices;
