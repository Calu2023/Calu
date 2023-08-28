import { Link } from 'react-router-dom';

const ModalBuy = ({
  handleSubmit,
  setIsModalOpen,
  email,
  setEmail,
  checkRef,
  check,
  handleCheck,
}) => {
  return (
    <div>
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
              <div className='noCheck'>Debes aceptar los {<Link>términos y condiciones</Link>}</div>
            )}
          </div>
        </form>
      </div>

      <div class='modal-background'></div>
    </div>
  );
};
export default ModalBuy;
