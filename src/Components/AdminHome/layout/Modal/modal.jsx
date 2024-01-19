import React from "react";
import { useState } from "react";
import "./modal.css";

const Modal = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpened(true)}> &#9998;</button>

      {isOpened && (
        <>
          <div className="modal_ctn">
            <div className="super-awesome-modal">
              <p
                className="close_modal_btn_3"
                onClick={() => setIsOpened(false)}
              >
                X
              </p>
              <h1>{children}</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Modal;
