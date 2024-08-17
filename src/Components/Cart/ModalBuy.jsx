 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Terms from './Terms';
import { useCustomContext } from '../../Hooks/Context/Context';  

const ModalBuy = ({
  handleSubmit,
  setIsModalOpen,
  email,
  setEmail,
  checkRef,
  check,
  handleCheck,
  total,
}) => {
  const { handleDownload } = useCustomContext(); 
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  const handleModal = () => {
    setModal(!modal);
  };

const handleNavigate = () => {
  // Check if the user has accepted the privacy policies
  if (!check) {
    alert('Debes aceptar las políticas de privacidad');
    return;
  }

  // Check if the email is provided
  if (!email) {
    alert('Debes ingresar tu correo electrónico');
    return;
  }

  // Handle navigation or download based on the total
  if (total > 0) {
    navigate('/payment');
  } else {
    // Ensure `carrito[0]` is defined before passing it to `handleDownload`
    if (carrito && carrito.length > 0) {
      handleDownload(carrito[0]);
    } else {
      alert('No hay productos disponibles para descargar.');
    }
    setIsModalOpen(false);
  }
};

  return (
    <div className='ctn_modal'>
      <div className='emailModal'>
        <form onSubmit={handleSubmit}>
          <h3>Ingrese su correo electrónico:</h3>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <div className='email_btn_ctn'>
            <button className='email_btn' type='submit' onClick={handleNavigate}>
              {total > 0 ? 'Continuar' : 'Descargar'}
            </button>
            <button className='email_btn' onClick={() => setIsModalOpen(false)}>Cancelar</button>
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
      <div onClick={() => setIsModalOpen(false)} className='modal-background' />
    </div>
  );
};

export default ModalBuy;
