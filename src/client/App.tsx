import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import Cart from './cart/Cart';
<<<<<<< HEAD
import AdminMenu from './adminHome/AdminHome';
import Orders from './order/Orders';
=======
// import AdminMenu from './adminMenu/adminMenu';
// import Orders from './order/Orders';
>>>>>>> dev
const App: FC = () => {
  return (
    <div>
      <Cart />
<<<<<<< HEAD
      <AdminMenu />
      <Orders />
=======
      {/* <AdminMenu />
      <Orders /> */}
>>>>>>> dev
      {/* <h1>HELLO THERE!</h1> */}
    </div>
  );
};

export default App;
