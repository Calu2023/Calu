import React from "react";
import { useState } from "react";
import "./card_modal.css";

export const Card_delete = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpened(true)}>ELIMINAR &#9998;</button>

      {isOpened && (
        <>
          <div className="card-modal-shadow"></div>
          <div className="card-modal-modal">
            <div>
              <p className="close_modal_btn" onClick={() => setIsOpened(false)}>
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

const Card_modal = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpened(true)}>CREAR TARJETA &#9998;</button>

      {isOpened && (
        <>
          <div className="create-card-modal">
            <p className="close_modal_btn_2" onClick={() => setIsOpened(false)}>
              X
            </p>
            <h1>{children}</h1>
          </div>
        </>
      )}
    </div>
  );
};
export default Card_modal;
