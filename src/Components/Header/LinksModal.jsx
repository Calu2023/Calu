import { Link } from 'react-router-dom';
import { useCustomContext } from '../../Hooks/Context/Context';

const LinksModal = ({ closeModal }) => {
  const { scroll_top } = useCustomContext();

  return (
    <div className='modal'>
      <div className='modal-content'>
        <Link onClick={scroll_top} to='/'>
          HOME
        </Link>
        <div className='line'></div>
        <Link onClick={scroll_top} to='/services'>
          SERVICIOS
        </Link>
        <div className='line'></div>
        <Link onClick={scroll_top} to='/product-list'>
          PRODUCTOS
        </Link>
        <div className='line'></div>
        <Link onClick={scroll_top} to='/blog'>
          BLOG
        </Link>
        <div className='line'></div>
        <Link onClick={scroll_top} to='/Contact'>
          CONTACTO
        </Link>
      </div>
    </div>
  );
};

export default LinksModal;
