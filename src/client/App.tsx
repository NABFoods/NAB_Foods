import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import Cart from './cart/Cart';
//import AdminMenu from './adminMenu/adminMenu';
import Orders from './order/Orders';

const App: FC = () => {
  return (
    <div>
      <Cart />

      {/* <AdminMenu /> */}
      <Orders />

      {/* <AdminMenu />
      <Orders /> */}
      {/* <h1>HELLO THERE!</h1> */}
    </div>
  );
};

export default App;
