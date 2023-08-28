import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/header';
import { auth, provider } from '../../firebase-config';
import './adminLogin.css';
import { useCustomContext } from '../../Hooks/Context/Context';

function AdminLogin() {
  let navigate = useNavigate();
  const { loginGoogle } = useCustomContext();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      loginGoogle();
      navigate('/');
    });
  };

  return (
    <div className='AdminLoginPage'>
      <Header />
      <p>Sign In With Google to Continue</p>
      <button className='AdminLogin-with-google-btn' onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default AdminLogin;
