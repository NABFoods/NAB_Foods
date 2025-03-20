import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import nabFoodsLogo from '../assets/nabFoodsLogo.jpeg';
import Menu from './menu/Menu';

import CartIcon from '../../cart/CartIcon';
const TaskBar: FC = () => {
  // const navigate = useNavigate();

  // // const goToCart = () => {
  // //   navigate('/cart');
  // // };

  return (
    <>
      <div className='h-16 lg:h-20 text-[#DB162F] p-4 flex justify-between items-center border-b-2 border-b-[#c59299] uppercase bg-white w-full fixed top-0 left-0 z-50'>
        <div className='hidden md:flex gap-4 items-center flex-1'>
          <a href='/'>Homepage</a>
        </div>
        <div className='text-2xl md:font-bold flex-1 '>
          <a
            href='/'
            //className='h-12 text-4xl font-bold text-[#DB162F] mb-4 px-4 flex items-center justify-center text-center md:text-base cursor-pointer'
          >
            <img
              src={nabFoodsLogo}
              alt=''
              className='object-contain w-20 lg:w-32 cursor-pointer'
            />
          </a>
        </div>
        <div className='md:hidden'>
          <Menu />
        </div>
        <div className='hidden md:flex gap-4 items-center justify-content:endflex-1'>
          <a href='/'>Menu</a>
          <div className=' flex items-center gap-2 cursor-pointer'>
            <CartIcon />
          </div>
        </div>
      </div>
      {/* <button onClick={goToCart}>CART</button> */}
    </>
  );
};

export default TaskBar;
