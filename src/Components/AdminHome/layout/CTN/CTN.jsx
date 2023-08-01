import React from "react";
import "./ctn.css";
import { useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../../firebase-config";
import Modal from "../Modal/modal";

const CTN = () => {
  const [ctninfo, setCtninfo] = useState([]);
  /*setDoc(doc(db, "home", "CTN"), {
    title: "¡QUÉ TU NEGOCIO DESPEGUE!",
    t1: " CONTANOS SOBRE TUS PRODUCTOS",

  });*/

  const [title, setTitle] = useState("");
  const [t1, setT1] = useState("");

  const updateTitle = async () => {
    const ctn_info = doc(db, "home", "CTN");
    await updateDoc(ctn_info, {
      title: title,
    });
    alert("¡ Texto modificado con exito !");
  };

  const updateT1 = async () => {
    const ctn_info = doc(db, "home", "CTN");
    await updateDoc(ctn_info, {
      t1: t1,
    });
    alert("¡ Texto modificado con exito !");
  };

  /////////////////////// GET

  useEffect(() => {
    const getCtn = async () => {
      const CtnDoc = doc(db, "home", "CTN");
      const docSnapshot = await getDoc(CtnDoc);
      if (docSnapshot.exists()) {
        setCtninfo(docSnapshot.data());
      }
    };
    getCtn();
  }, []);

  return (
    <div className="CTN_ctn">
      <div className="CTN_ctn2">
        <div className="edit">
          <h1 className="CTN_title">{ctninfo.title}</h1>
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
        <button className="ctn_button"> CONTACTANOS </button>
        <div className="edit">
          <div className="para">
            <p>{ctninfo.t1}</p>
          </div>
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
    </div>
  );
};

export default CTN;
