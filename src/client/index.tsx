// React entry point
import '../main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import Home from './home/Home';
import AdminHome from './adminHome/AdminHome';
import AdminLogin from './adminLogin/AdminLogin';
import App from './App';
import Orders from './adminOrders/Orders';
import Cart from './cart/Cart';
import TaskBar from './home/components/TaskBar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root')!);

// Google Client ID from environment variables
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; 
// console.log('index.tsx - Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);

// Wrapping App w/ Provider to give access to Redux store
root.render(
  // Using React.StrictMode as best practice for assisting w/ development w/out impacting production
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId!}>
      <BrowserRouter>
        {/* <TaskBar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/app' element={<App />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        {/*<App />*/}
      </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
