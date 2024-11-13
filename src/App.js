import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Cambio de BrowserRouter a HashRouter
import { onAuthStateChanged } from 'firebase/auth';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Contact_Screen from './Components/Contact/Contact_Screen';
import Services from './Components/Services/Services';
import './App.css';
import Blog_Screen from './Components/Blog/Blog_screen';
import BlogView_Screen from './Components/Blog/BlogView_screen';
import VideoBackgroundComponent from './Components/VideoBackgroundComponent/VideoBackgroundComponent';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import CreatePost from './Components/CreatePost/CreatePost';
import AdminHome from './Components/AdminHome/AdminHome';
import AdminCrud from './Components/Admin/AdminCrud';
import ProductForm from './Components/ProductForm/ProductForm';
import ProductDetail_Screen from './Components/ProductForm/ProductDetail_Screen';
import Product_List from './Components/ProductForm/Product_List';
import PaymentGateway from './Components/Payment/Payment';
import { auth } from './firebase-config';
import EmailList from './Components/Contact/EmailList';
import { Provider } from './Hooks/Context/Context';
import Terms from './Components/Cart/Terms';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PrivacyPolicy from './Components/politicasPrivacidad/privacyPolicy';
import SuccessPayment from './Components/Payment/SuccessPayment';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider>
      <Router>
        <div className='container_'>
          <VideoBackgroundComponent />

          <Routes>
            <Route
              path='/'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <Home />
                </Scrollbars>
              }
            />
            <Route
              path='/admin-home'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <AdminHome />
                </Scrollbars>
              }
            />
            <Route
              path='/admin-login'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <AdminLogin />
                </Scrollbars>
              }
            />
            <Route
              path='/admin-crud'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <AdminCrud />
                </Scrollbars>
              }
            />
            <Route
              path='/create-post'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <CreatePost />
                </Scrollbars>
              }
            />
            <Route
              path='/product-form'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <ProductForm />
                </Scrollbars>
              }
            />
            <Route
              path='/product-list'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <Product_List />
                </Scrollbars>
              }
            />
            <Route
              path='/product/:id'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <ProductDetail_Screen />
                </Scrollbars>
              }
            />
            <Route
              path='/edit-post/:id'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <CreatePost />
                </Scrollbars>
              }
            />
            <Route
              path='/about'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <About />
                </Scrollbars>
              }
            />
            <Route
              path='/blog'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <Blog_Screen isAuth={isAuth} />
                </Scrollbars>
              }
            />
            <Route
              path='/blog/:id'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <BlogView_Screen />
                </Scrollbars>
              }
            />
            <Route
              path='/contact'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <Contact_Screen />
                </Scrollbars>
              }
            />
            <Route
              path='/services'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <Services />
                </Scrollbars>
              }
            />
            <Route
              path='/payment'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <PaymentGateway />
                </Scrollbars>
              }
            />
            <Route
              path='/email-list'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <EmailList />
                </Scrollbars>
              }
            />
            <Route
              path='/terms'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <Terms />
                </Scrollbars>
              }
            />
              <Route
              path='/politicas-de-privacidad'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <PrivacyPolicy />
                </Scrollbars>
              }
            />

             <Route
              path='/success-payment'
              element={
                <Scrollbars style={{ height: '100vh' }}>
                  <SuccessPayment/>
                </Scrollbars>
              }
            />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
