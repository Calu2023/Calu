import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/header";
import { auth, provider } from "../../firebase-config";
import "./adminLogin.css";

function AdminLogin({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="AdminLoginPage">
      <Header />
      <p>Sign In With Google to Continue</p>
      <button className="AdminLogin-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default AdminLogin;
