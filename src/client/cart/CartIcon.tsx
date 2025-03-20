import React, { FC } from 'react';
import cart from '../home/assets/shopping-cart.png';
const CartIcon = () => {
  return (
    <a href='/cart' className='flex items-center gap-1'>
      <span>Cart (3)</span>
      <div className='relative w-8 h-8 top-1 z-10 md:top-0 md:w-5 md:h-5'>
        <img src={cart} width={25} height={25} alt='Cart' />
      </div>
    </a>
  );
};

export default CartIcon;
