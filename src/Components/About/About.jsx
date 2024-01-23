import React, { useState, useEffect, memo } from "react";
import "./about.css";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const AboutContent = memo(({ info }) => (
  <div className="about_container">
    <div className="about_items">
      <div className="edit">
        <h1 className="title_about">{info.title}</h1>
      </div>

      <div>
        <div className="edit">
          <h2 className="sub_1">{info.t1}</h2>
        </div>
        <div className="edit">
          <h2 className="sub_2">{info.t2}</h2>
        </div>
      </div>
      <div>
        <div className="edit">
          <p>{info.t3}</p>
        </div>
        <div className="edit">
          <p>{info.t4}</p>
        </div>
      </div>
      <div className="edit">
        <p className="text_last">{info.t5}</p>
      </div>
    </div>
  </div>
));

const About = () => {
  const [aboutInfo, setAboutInfo] = useState({});

  useEffect(() => {
    const fetchAboutInfo = async () => {
      const aboutDocRef = doc(db, "home", "About");
      const docSnap = await getDoc(aboutDocRef);
      if (docSnap.exists()) {
        setAboutInfo(docSnap.data());
      }
    };

    fetchAboutInfo();
  }, []);

  return (
    <div className="sec">
      <AboutContent info={aboutInfo} />
    </div>
  );
};

export default About;
