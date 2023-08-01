import React from "react";
import "./about.css";
import { useState } from "react";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase-config";

const About = () => {
  const [aboutinfo, setAboutinfo] = useState([]);

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
    <div className="about_container">
      <div className="about_items">
        <div className="edit">
          <h1 className="title_about">{aboutinfo.title}</h1>
        </div>

        <div>
          <div className="edit">
            <h2 className="sub_1">{aboutinfo.t1}</h2>
          </div>
          <div className="edit">
            <h2 className="sub_2">{aboutinfo.t2}</h2>
          </div>
        </div>
        <div>
          <div className="edit">
            <p>{aboutinfo.t3}</p>
          </div>
          <div className="edit">
            <p>{aboutinfo.t4}</p>
          </div>
        </div>
        <div>
          <div className="edit">
            <p className="text_last">{aboutinfo.t5}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
