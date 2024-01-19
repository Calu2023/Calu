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
    
    <Provider >
   
      <Router>
        <div className='container_'>
      <VideoBackgroundComponent />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin-home' element={<AdminHome />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-crud' element={<AdminCrud />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/product-form' element={<ProductForm />} />
            <Route path='/product-list' element={<Product_List />} />
            <Route path='/product/:id' element={<ProductDetail_Screen />} />
            <Route path='/edit-post/:id' element={<CreatePost  />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog_Screen isAuth={isAuth} />} />
            <Route path='/blog/:id' element={<BlogView_Screen />} />
            <Route path='/contact' element={<Contact_Screen />} />
            <Route path='/services' element={<Services />} />
            <Route path='/payment' element={<PaymentGateway />} />
            <Route path='/email-list' element={<EmailList />} />
            <Route path='/terms' element={<Terms />} />
          </Routes>
        </div>
      </Router>
      
    </Provider>
  );
}

export default App;
