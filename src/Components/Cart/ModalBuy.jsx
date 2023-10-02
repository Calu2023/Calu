import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <div className='ctn_modal'>
      <div className='emailModal'>
        <form onSubmit={handleSubmit}>
          <h3>Ingrese su correo electrónico:</h3>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className='email_btn_ctn'>
            <button className='email_btn' type='submit'>
              Continuar
            </button>
            <button className='email_btn' onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </div>
          <div className='terms'>
            <div className='check'>
              <p>Acepto los términos y condiciones</p>
              <input type='checkbox' name='' id='' ref={checkRef} onClick={handleCheck} />
            </div>
            {!check && (
              <div className='noCheck'>
                Debes aceptar los{' '}
                {
                  <Link className='terms_link' onClick={handleModal}>
                    términos y condiciones
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
