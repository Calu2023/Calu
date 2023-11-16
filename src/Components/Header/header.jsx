import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import miImagen from '../../images/logocalu.png';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import cart from '../../images/carrito.png';
import Cart from '../Cart/Cart';
import ModalBuy from '../Cart/ModalBuy';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useCustomContext } from '../../Hooks/Context/Context';

export const Header = ({ cartItem, handleDelete }) => {
  const { isAuth, logoutGoogle, handleBlur, blur } = useCustomContext();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const checkRef = useRef(null);
  const [check, setCheck] = useState(true);
  const [showLinks, setShowLinks] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const navigate = useNavigate();
  useEffect(() => {
    //console.log(isAuth);
  }, [location, check, isAuth]);

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
    setShowLinks(!showLinks);
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
      const emailsCollectionRef = collection(db, 'email'); // Change to the correct collection name

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
  const scroll_top = () => {
    window.scroll({
      top: 0,
    });
  };
  return (
    <div>
      <header className={!blur ? 'navBar' : 'navBarBlur'}>
        <div className='header_items'>
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
          <nav>
            <Link to={'/'}>
              <img className='logoCalu' src={miImagen} alt='Logo Calu' />
            </Link>

            {!isAuth && <Link to='/admin-login'></Link>}
            <nav className={showLinks ? 'links ' : 'link show '}>
              <div className='links_ctn'>
                <Link
                  onClick={scroll_top && handleBlur}
                  className={location.pathname === '/' ? 'headerLinks' : ''}
                  to={'/'}
                >
                  HOME
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top && handleBlur}
                  className={location.pathname === '/services' ? 'headerLinks' : ''}
                  to={'/services'}
                >
                  SERVICIOS
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top && handleBlur}
                  className={location.pathname === '/product-list' ? 'headerLinks' : ''}
                  to={'/product-list'}
                >
                  PRODUCTOS
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top && handleBlur}
                  className={location.pathname === '/blog' ? 'headerLinks' : ''}
                  to={'/blog'}
                >
                  {' '}
                  BLOG{' '}
                </Link>
                <div className='line'></div>
                <Link
                  onClick={scroll_top && handleBlur}
                  className={location.pathname === '/Contact' ? 'headerLinks' : ''}
                  to={'/Contact'}
                >
                  CONTACTO{' '}
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
                {Array.isArray(cartItem) && !showCart && (
                  <p className='totalItems'>{cartItem.length}</p>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      {showCart && (
        <Cart close={handleClose} cart={cartItem} handleDelete={handleDelete} buy={handlePay} />
      )}
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
    </div>
  );
};
