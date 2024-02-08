import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import miImagen from '../../images/logocalu.webp';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import cart from '../../images/carrito.webp';
import Cart from '../Cart/Cart';
import ModalBuy from '../Cart/ModalBuy';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useCustomContext } from '../../Hooks/Context/Context';
import LinksModal from './LinksModal';
export const Header = ({ handleDelete }) => {
  const { isAuth, logoutGoogle, handleBlur, scroll_top } = useCustomContext();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const checkRef = useRef(null);
  const [check, setCheck] = useState(false);
  const showLinks = true;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navigate = useNavigate();
  const [showLinksModal, setShowLinksModal] = useState(false);

  const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  useEffect(() => {}, [location, check, isAuth]);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('isAuth');
      logoutGoogle();
      navigate('/');
    });
  };
  const handleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };
  const handleLinks = () => {
    setShowLinksModal(!showLinksModal);
    handleBlur();
  };
  const handleClose = () => {
    setShowCart(!showCart);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkRef.current.checked) {
      if (email.match(emailRegex)) {
        await saveEmailToFirebase(email); // Save the email to Firebase
        navigate('/payment');
      } else {
        alert('Invalid email format. Please enter a valid email.');
      }
    } else {
      console.log('NOPE');
      setCheck(false);
    }
  };
  const handleCheck = () => {
    setCheck(checkRef.current.checked);
  };
  const saveEmailToFirebase = async (email) => {
    try {
      const emailsCollectionRef = collection(db, 'email');
      await addDoc(emailsCollectionRef, {
        email,
        timestamp: new Date(),
      });
      console.log('Email saved to Firebase successfully');
    } catch (error) {
      console.error('Error saving email to Firebase:', error);
    }
  };
  const handlePay = () => {
    setIsModalOpen(true);
    setShowCart(false);
    handleBlur();
  };

  return (
    <div className='modal-link'>
      <header className='navBar'>
        <div className='header_items'>
          <nav>
            <Link to={'/'}>
              <img className='logoCalu' src={miImagen} alt='Logo Calu' />
            </Link>
            {!isAuth && <Link to='/admin-login'></Link>}
            <nav className={showLinks ? 'links ' : 'link show '}>
              <div className='links_ctn'>
                <Link
                  onClick={scroll_top}
                  className={location.pathname === '/' ? 'headerLinks' : ''}
                  to={'/'}
                >
                  HOME
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top}
                  className={location.pathname === '/services' ? 'headerLinks' : ''}
                  to={'/services'}
                >
                  SERVICIOS
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top}
                  className={location.pathname === '/product-list' ? 'headerLinks' : ''}
                  to={'/product-list'}
                >
                  PRODUCTOS
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top}
                  className={location.pathname === '/blog' ? 'headerLinks' : ''}
                  to={'/blog'}
                >
                  BLOG
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top}
                  className={location.pathname === '/Contact' ? 'headerLinks' : ''}
                  to={'/Contact'}
                >
                  CONTACTO
                </Link>
              </div>
            </nav>

            <span onClick={handleLinks} className={`btn ${showLinks ? 'bar' : 'cross'}`}>
              <div className='hamburguesa'>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </span>
            <div className='cart-2'>
              <div className='carrito' onClick={() => setShowCart(true)}>
                <img src={cart} alt={cart} />
                {carritoLocalStorage !== null && !showCart && (
                  <p className='totalItems'>
                    {carritoLocalStorage.length > 0 ? carritoLocalStorage.length : ''}
                  </p>
                )}
              </div>
            </div>
          </nav>
        </div>
        {isAuth && (
          <div className='admin-menu'>
            <button className='admin-btn' onClick={handleAdminMenu}>
              ADMIN
            </button>
            {showAdminMenu && (
              <div className='admin-dropdown'>
                <Link to='/product-form'>Create Product</Link>
                <Link to='/create-post'>Create Post</Link>
                <Link to='/admin-crud'>Create Services</Link>
                <Link to='/admin-home'>Edit Home</Link>
                <Link to='/email-list'>Email List</Link>
                <button onClick={signUserOut}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </header>
      {showCart && (
        <Cart
          close={handleClose}
          cart={carritoLocalStorage}
          handleDelete={handleDelete}
          buy={handlePay}
        />
      )}

      <div className={isModalOpen || showLinksModal ? 'modal-background' : ''}>
        {isModalOpen && (
          <ModalBuy
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            setIsModalOpen={setIsModalOpen}
            checkRef={checkRef}
            check={check}
            handleCheck={handleCheck}
          />
        )}

        {showLinksModal && <LinksModal closeModal={() => setShowLinksModal(false)} />}
      </div>
    </div>
  );
};
