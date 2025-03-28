// Component corresponding to order_products table tracking products added to cart

import React, { useState, useEffect } from 'react';
import icon from '../home/assets/restaurant.png';
import { useAppSelector, useAppDispatch } from '../hooks'; // typed versions of userSelector & useDispatch from hooks.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router';

import { addToCart, removeFromCart, selectTotalQuantity } from './cartSlice';

import { updateAmount } from '../home/homeSlice';
import TaskBar from '../home/components/TaskBar';

export function Cart() {
  const dispatch = useAppDispatch();
  const header = {
    'Content-type': 'application/json',
  };
  const items = useAppSelector((state) => state.cart.items);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: 0,
  });
  const [pickup, setPickup] = useState(false);
  const fullItems = useAppSelector((state) => state.cart);
  const product = useSelector((state: RootState) => state.home.foodCard);
  const quantity = useSelector((state: RootState) => {
    return state.cart.quantity;
  });
  const itemNumber = useSelector((state: RootState) => state.cart.items);

  //Every time items update we get fresh quantity information
  useEffect(() => {
    dispatch(selectTotalQuantity());
  }, [itemNumber, quantity, dispatch]);

  console.log('ITEMS FULL CART', items);
  const StripeKey: string | undefined =
    'pk_test_51R4BAm4GalmXqpbjXbMWtRvaxsHke16qEuJEEWZc8KblTZrB88vYN8wyaDlJ1dPV045a4R7FlqRPrjRmYouQZcfO00WlfTE16F'; /*process.env.STRIPE_KEY*/
  const makePayment = async () => {
    console.log('This is product', product);
    const stripe = await loadStripe(StripeKey!);
    console.log(StripeKey);
    const body = {
      products: product,
      quantity: quantity,
      defaultImage: `../home/assets/restaurant.png`,
    };
    const response = await fetch(`http://localhost:3000/api/createCheckout`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const handleCustomerInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const checkoutButton = async () => {
    const response = await fetch('http://localhost:3000/api/createOrder', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(customerInfo),
    });
    makePayment();
  };

  // for getting total price
  // const totalPrice = useAppSelector(getTotalPrice);
  // Use to know if customer has ordered....??
  // const checkoutState = useAppSelector((state) => state.cart.checkoutState);

  return (
    <div className='mt-20 h-[calc(100vh-6rem)] md:h-calc(100vh-9rem)] flex flex-col text-[#DB162F] lg:flex-row'>
      {/* <Link to='/'>
          <button>BACK</button>
        </Link> */}
      <TaskBar />
      <div className=' flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40'>
        {Object.entries(items).map((item, idx) => (
          <div
            className=' p-4 flex flex-col justify-center overflow-scroll lg:h-full  2xl:w-1/2 xl:px-40'
            key={idx}
          >
            {/* // Products Container */}
            <div className='flex items-center justify-between mb-4'>
              <button className='cursor-pointer'>X</button>
              <img src={icon} alt='' width={100} height={100} />
              <div>
                <h1 className='uppercase text-xl font-bold'>{item[0]} </h1>
              </div>
              {/* Price of Individual Item */}
              <h2 className='font-bold'>${item[1][2]}</h2>

              {/* price:item is not quite right - currently this is the quantity of the item not the price of the item */}
              <button
                className='cursor-pointer'
                onClick={() =>
                  dispatch(
                    addToCart({ product_name: item[0], price: item[1][0] })
                  )
                }
              >
                +
              </button>
              <span>{item[1][0]}</span>
              <button
                className='cursor-pointer'
                onClick={() =>
                  dispatch(
                    removeFromCart({ product_name: item[0], price: item[1][0] })
                  )
                }
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Payments Container */}
      <div className='h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6'>
        <div>
          <div className='flex gap-2'>
            <button
              className='bg-[#DB162F] text-white p-3 rounded-md w-1/2 self-end'
              onClick={() => setPickup(true)}
            >
              PICKUP
            </button>
            <button
              className='bg-[#DB162F] text-white p-3 rounded-md w-1/2 self-end'
              onClick={() => setPickup(false)}
            >
              DELIVERY
            </button>
          </div>
          {!pickup && (
            <div className='flex flex-col'>
              <h1>Delivery Details</h1>
              <input
                type='text'
                className='input-field text-black'
                name='name'
                placeholder='Name'
                onChange={handleCustomerInfo}
              />
              <input
                type='text'
                className='input-field text-black'
                name='address'
                placeholder='Address'
                onChange={handleCustomerInfo}
              />
              <input
                type='text'
                className='input-field text-black'
                name='phone'
                placeholder='Phone'
                onChange={handleCustomerInfo}
              />
            </div>
          )}
          {pickup && (
            <div className='flex flex-col'>
              <h1>Pickup Details</h1>
              <input
                type='text'
                className='input-field text-black'
                name='name'
                placeholder='Name'
                onChange={handleCustomerInfo}
              />
              <input
                type='text'
                className='input-field text-black'
                name='phone'
                placeholder='Phone'
                onChange={handleCustomerInfo}
              />
            </div>
          )}
        </div>
        <div className='flex justify-between'>
          <span>Subtotal({quantity})</span>
          <span>$15.99</span>
        </div>
        <div className='flex justify-between'>
          <span>Service Cost({quantity})</span>
          <span>$0.00</span>
        </div>
        <div className='flex justify-between'>
          <span>Delivery Cost({quantity})</span>
          <span className='text-green-500'>Free</span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <span>TOTAL (INCL.VAT)({quantity})</span>
          <span className='font-bold'>$81.70</span>
        </div>
        <button
          onClick={checkoutButton}
          className='bg-[#DB162F] text-white p-3 rounded-md w-1/2 self-end'
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default Cart;
