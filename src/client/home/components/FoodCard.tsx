import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch } from '../../hooks';
import { addToCart, removeFromCart } from '../../cart/cartSlice';

import { RootState } from '../../store';
const FoodCard: FC = () => {
  const product = useSelector((state: RootState) => state.home.foodCard);
  const dispatch = useAppDispatch();

  const addFoodItem = (product: { product_name: string }) => {
    dispatch(addToCart(product.product_name));
  };

  const removeFoodItem = (product: { product_name: string }) => {
    dispatch(removeFromCart(product.product_name));
  };

  const StripeKey: string | undefined =
    'pk_test_51R4BAm4GalmXqpbjXbMWtRvaxsHke16qEuJEEWZc8KblTZrB88vYN8wyaDlJ1dPV045a4R7FlqRPrjRmYouQZcfO00WlfTE16F'; /*process.env.STRIPE_KEY*/
  const makePayment = async () => {
    const stripe = await loadStripe(StripeKey!);
    console.log(StripeKey);
    const body = {
      products: product,
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

    // if(result.error){
    //   console.log(result.error)
    // }
  };
  return (
    <>
      {Object.values(product).map((product) => (
        <div className='FoodCard'>
          <h2 className='text-4xl text-blue-700'>{product.product_name}</h2>
          <p> {product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => addFoodItem(product)}>+</button>
          <button onClick={() => removeFoodItem(product)}>-</button>
          <button onClick={makePayment}>PAY *TESTING*</button>
        </div>
      ))}
    </>
  );
};

export default FoodCard;
