import React from "react";
import "./about.css";
import { useState } from "react";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../../firebase-config";

import Modal from "../Modal/modal";

const About = () => {
  /*setDoc(doc(db, "home", "About"), {
    title: "¿QUIENES SOMOS?",
    t1: "SOMOS UN EQUIPO",
    t2: "APASIONADO POR LA TRANSFORMACION DIGITAL",
    t3: " Compartimos la pasión por nuestro trabajo y la ilusión por cambiar el mundo emprendedor.",
    t4: "   Potenciamos la identidad digital de tu marca acompañándote en el proceso, escuchándote y aconsejándote para que tu experiencia y la de tu público sea única.",
    t5: "!DESDE EL MOMENTO CERO NOS COMPROMETEMOS CON TU PROPÓSITO!",
  });*/
  ///////////////////////////////////////////
  const [aboutinfo, setAboutinfo] = useState([]);

  /////////////////////////////////
  const [title, setTitle] = useState("");
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [t3, setT3] = useState("");
  const [t4, setT4] = useState("");
  const [t5, setT5] = useState("");

  const updateTitle = async () => {
    const about_info = doc(db, "home", "About");
    await updateDoc(about_info, {
      title: title,
    });
    alert("¡ Texto modificado con exito !");
  };
  const updateT1 = async () => {
    const about_info = doc(db, "home", "About");
    await updateDoc(about_info, {
      t1: t1,
    });
    alert("¡ Texto modificado con exito !");
  };
  const updateT2 = async () => {
    const about_info = doc(db, "home", "About");
    await updateDoc(about_info, {
      t2: t2,
    });
    alert("¡ Texto modificado con exito !");
  };
  const updateT3 = async () => {
    const about_info = doc(db, "home", "About");
    await updateDoc(about_info, {
      t3: t3,
    });
    alert("¡ Texto modificado con exito !");
  };
  const updateT4 = async () => {
    const about_info = doc(db, "home", "About");
    await updateDoc(about_info, {
      t4: t4,
    });
    alert("¡ Texto modificado con exito !");
  };
  const updateT5 = async () => {
    const about_info = doc(db, "home", "About");
    await updateDoc(about_info, {
      t5: t5,
    });
    alert("¡ Texto modificado con exito !");
  };

  ///////////////////////
  useEffect(() => {
    const getAbout = async () => {
      const AboutDoc = doc(db, "home", "About");
      const docSnapshot = await getDoc(AboutDoc);
      if (docSnapshot.exists()) {
        setAboutinfo(docSnapshot.data());
      }
    };
    getAbout();
  }, []);

  return (
    <div>
      <div className="about_container">
        <div className="about_items">
          <div>
            <div className="edit">
              <h1 className="title_about">{aboutinfo.title}</h1>
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
          </div>
        </div>
        <div>
          <div className="edit">
            <h2 className="sub_1">{aboutinfo.t1}</h2>
            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese texto 1 "
                onChange={(e) => setT1(e.target.value)}
              />
              <button onClick={() => updateT1()}>GUARDAR</button>
            </Modal>
          </div>
          <div className="edit">
            <h2 className="sub_2">{aboutinfo.t2}</h2>
            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese texto 2 "
                onChange={(e) => setT2(e.target.value)}
              />
              <button onClick={() => updateT2()}>GUARDAR</button>
            </Modal>
          </div>
        </div>
        <div>
          <div className="edit">
            <p>{aboutinfo.t3}</p>
            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese texto 3 "
                onChange={(e) => setT3(e.target.value)}
              />
              <button onClick={() => updateT3()}>GUARDAR</button>
            </Modal>
          </div>
          <div className="edit">
            <p>{aboutinfo.t4}</p>

            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese texto 4 "
                onChange={(e) => setT4(e.target.value)}
              />
              <button onClick={() => updateT4()}>GUARDAR</button>
            </Modal>
          </div>
        </div>
        <div>
          <div className="edit">
            <p className="text_last">{aboutinfo.t5}</p>

            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese texto 5 "
                onChange={(e) => setT5(e.target.value)}
              />
              <button onClick={() => updateT5()}>GUARDAR</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
