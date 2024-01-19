import Slider from "../../../Portfolio/Slider/Slider";

import CardOur from "../../../OurServices/Card_OurService/Card_our";
import { useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../../firebase-config";
import Modal from "../Modal/modal";

const OurServices = () => {
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
  };
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
            {services &&
              services.map((services, index) => (
                <CardOur
                  key={index}
                  image={
                    <img
                      className="icono-servicios"
                      src={services.data().img}
                      alt="icono llave"
                    />
                  }
                  title={services.data().title}
                  des={services.data().sub}
                  btn={""}
                ></CardOur>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default OurServices;
