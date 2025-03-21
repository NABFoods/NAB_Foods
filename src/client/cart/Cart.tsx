// Component corresponding to order_products table tracking products added to cart

import React from 'react';
import icon from '../home/assets/restaurant.png';
import { useAppSelector, useAppDispatch } from '../hooks'; // typed versions of userSelector & useDispatch from hooks.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router';

export function Cart() {
  const items = useAppSelector((state) => state.cart.items);
  const fullItems = useAppSelector((state) => state.cart);
  const product = useSelector((state: RootState) => state.home.foodCard);
  const quantity = useSelector((state: RootState) => {
    return state.cart.quantity;
  });
  console.log('ITEMS FULL CART', items, fullItems);
  const StripeKey: string | undefined =
    'pk_test_51R4BAm4GalmXqpbjXbMWtRvaxsHke16qEuJEEWZc8KblTZrB88vYN8wyaDlJ1dPV045a4R7FlqRPrjRmYouQZcfO00WlfTE16F'; /*process.env.STRIPE_KEY*/
  const makePayment = async () => {
    const stripe = await loadStripe(StripeKey!);
    console.log(StripeKey);
    const body = {
      products: product,
      quantity: quantity,
      defaultImage: `../home/assets/restaurant.png`,
    };

    const header = {
      'Content-type': 'application/json',
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

  // for getting total price
  // const totalPrice = useAppSelector(getTotalPrice);
  // Use to know if customer has ordered....??
  // const checkoutState = useAppSelector((state) => state.cart.checkoutState);

  return (
    <>
      <div className='mt-20 flex flex-col text-[#DB162F] '>
        <Link to='/'>
          <button>BACK</button>
        </Link>
        {Object.entries(items).map((item, idx) => (
          <div className='h-1/2 p-4' key={idx}>
            <div>
              <img src={icon} alt='' width={100} height={100} />
              <div>
                <h1>Product: {item[0]} </h1>
                <span>Quantity {item[1]}</span>
                <h2>$15.99</h2>
                <button>X</button>
              </div>
            </div>
          </div>
        ))}
        <div className='h-1/2 p-4 bg-fuchsia-50'>
          <div>
            <span>Subtotal({quantity})</span>
            <span>$15.99</span>
          </div>
          <hr />
          <button
            onClick={makePayment}
            className='bg-[#DB162F] text-white p-3 rounded-md w-1/2'
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
