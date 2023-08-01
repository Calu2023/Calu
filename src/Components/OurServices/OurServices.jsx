import Slider from "../Portfolio/Slider/Slider";
import "./OurServices.css";
import Card_our from "./Card_OurService/Card_our";
import { useState } from "react";
import { doc, getDoc, collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase-config";

const OurServices = () => {
  const [ourServicesinfo, setOurServicesinfo] = useState([]);
  /// TEXTOS
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
  ///// GET SERVICIOS
  const [services, setServices] = useState([]);

  const getServices = async () => {
    const results = await getDocs(query(collection(db, "servicios")));
    return results;
  };
  useEffect(() => {
    getServicesData();
  }, []);

  const getServicesData = async () => {
    const service = await getServices();

    setServices(service.docs);
    console.log(services);
  };
  ////////////////////////
  return (
    <div className="ourServices">
      <div className="ourServices_text">
        <div className="edit">
          <h1 className="title-first-nuestros-servicios">
            {ourServicesinfo.title}
          </h1>
        </div>

        <div className="edit">
          <p className="text-description">{ourServicesinfo.t1}</p>
        </div>
      </div>
      <div className="ctn-servicios">
        <div className="slider">
          <Slider>
            {services &&
              services.map((services) => (
                <Card_our
                  image={
                    <img
                      className="icono-servicios"
                      src={services.data().img}
                      alt="icono llave"
                    />
                  }
                  title={services.data().title}
                  des={services.data().sub}
                  btn={
                    <a className=" button_portfolio" href="/services">
                      Ver más
                    </a>
                  }
                ></Card_our>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default OurServices;
