import "./Onboarding.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import logoCalu from "../../images/logocalu.png";

const Onboarding = () => {
  const [onboardinginfo, setOnboardinginfo] = useState([]);

  useEffect(() => {
    const getOnboarding = async () => {
      const OnboardingDoc = doc(db, "home", "Onboarding");
      const docSnapshot = await getDoc(OnboardingDoc);
      if (docSnapshot.exists()) {
        setOnboardinginfo(docSnapshot.data());
      }
    };
    getOnboarding();
  }, []);

  return (
    <div>
      <div className="onboarding">
        <div className="parrafo">
          <h1>{onboardinginfo.title}</h1>

          <p>{onboardinginfo.t1}</p>

          <p>{onboardinginfo.t2}</p>

          <p>{onboardinginfo.t3}</p>

          <h2>{onboardinginfo.t4}</h2>

          <div className="contact-btn">
            <Link to={"/contact"}>¡Contáctanos!</Link>
          </div>
        </div>

        <div className="logo_ctn">
          <img className="logoOnboard" src={logoCalu} alt="logo calu" />
        </div>
      </div>

      <div className="contactFlex"></div>
    </div>
  );
};
export default Onboarding;
