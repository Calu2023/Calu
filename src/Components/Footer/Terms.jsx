import React from "react";
import "./terms.css"; 
import Terminos from "./terminos";

const Terms = ({ closeModal }) => {
  return (
    <div className="terms-modal">
      <div className="terms-content">
        <Terminos />
        <button className="close-button" onClick={closeModal}>X</button>
      </div>
    </div>
  );
};

export default Terms;