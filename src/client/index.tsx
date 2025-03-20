// React entry point
import '../main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import Home from './home/Home';
import AdminHome from './adminHome/AdminHome';
import App from './App';
import Orders from './adminOrders/Orders';
import Cart from './cart/Cart';
import TaskBar from './home/components/TaskBar';
const root = createRoot(document.getElementById('root')!);

// Wrapping App w/ Provider to give access to Redux store
root.render(
  // Using React.StrictMode as best practice for assisting w/ development w/out impacting production
  <React.StrictMode>
    <Provider store={store}>
      <TaskBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/app' element={<App />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        {/*<App />*/}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
