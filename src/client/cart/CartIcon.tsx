import React, { FC, useEffect } from 'react';
import cart from '../home/assets/shopping-cart.png';
import { selectTotalQuantity } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import { Link } from 'react-router-dom';

const CartIcon: FC = () => {
  const quantity = useSelector((state: RootState) => {
    return state.cart.quantity;
  });

  return (
    <Link to='/cart' className='flex items-center gap-1'>
      <span>Cart ({quantity})</span>
      <div className='relative w-8 h-8 top-1 z-10 md:top-0 md:w-5 md:h-5'>
        <img src={cart} width={25} height={25} alt='Cart' />
      </div>
    </Link>
  );
};

export default CartIcon;
