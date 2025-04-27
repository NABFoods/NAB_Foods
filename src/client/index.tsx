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
import Orders from './adminOrders/Orders';
import Cart from './cart/Cart';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Menupage from './home/components/menu/Menupage';
import Entrees from './home/components/menu/Entrees';
import Sides from './home/components/menu/Sides';
import Preprep from './home/components/menu/Preprep';
import SuccessPage from './cart/SuccessPage';
import FailurePage from './cart/FailurePage';
import ProtectedProvider from './adminLogin/ProtectedProvider';

const root = createRoot(document.getElementById('root')!);

const auth = JSON.parse(localStorage.getItem('authInfo')!);
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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/orders'
              element={
                <ProtectedProvider isAllowed={auth}>
                  <Orders />
                </ProtectedProvider>
              }
            />
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route
              path='/adminHome'
              element={
                <ProtectedProvider isAllowed={auth}>
                  <AdminHome />
                </ProtectedProvider>
              }
            />
            <Route path='/menu' element={<Menupage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/menu/entree' element={<Entrees />} />
            <Route path='/menu/side' element={<Sides />} />
            <Route path='/menu/preprep' element={<Preprep />} />
            <Route path='/successpage' element={<SuccessPage />} />
            <Route path='/failurepage' element={<FailurePage />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
