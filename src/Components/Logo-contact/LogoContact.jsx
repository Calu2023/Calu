import { Link } from 'react-router-dom';
import contacto from '../../images/Contactanos.png';

const LogoContact = () => {
  return (
    <div className='logo-contacto'>
      <Link to={'/contact'}>
        <img src={contacto} alt='logo-contacto' />
      </Link>
    </div>
  );
};
export default LogoContact;
