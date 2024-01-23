import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Terms from './Terms';

const ModalBuy = ({
  handleSubmit,
  setIsModalOpen,
  email,
  setEmail,
  checkRef,
  check,
  handleCheck,
}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleNavigate = () => {
    !check ? alert('Debes aceptar las políticas de privacidad') : navigate('/payment');
  };
  return (
    <div className='ctn_modal'>
      <div className='emailModal'>
        <form onSubmit={handleSubmit}>
          <h3>Ingrese su correo electrónico:</h3>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className='email_btn_ctn'>
            <button className='email_btn' type='submit' onClick={handleNavigate}>
              Continuar
            </button>
            <button className='email_btn' onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </div>
          <div className='terms'>
            <div className='check'>
              <p>Acepto las políticas de privacidad</p>
              <input type='checkbox' name='' id='' ref={checkRef} onClick={handleCheck} />
            </div>
            {!check && (
              <div className='noCheck'>
                Debes aceptar las
                {
                  <Link className='terms_link' onClick={handleModal}>
                    políticas de privacidad
                  </Link>
                }
              </div>
            )}
            {modal && <Terms />}
          </div>
        </form>
      </div>
      <div onClick={() => setIsModalOpen(false)} class='modal-background' />
    </div>
  );
};
export default ModalBuy;
