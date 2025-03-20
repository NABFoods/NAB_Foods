import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { RootState } from '../../store';
const FoodCard: FC = () => {
  const product = useSelector((state: RootState) => state.home.foodCard);
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
    <div className='flex flex-wrap'>
      {Object.values(product).map((product) => (
        <div
          key={product.id}
          className='w-full h-[60vh] border-r-2 border-b-2 border-[#DB162F] md:w-1/2'
        >
          {product.img_url && (
            <div>
              <img src={`${product.img_url}`}></img>
            </div>
          )}

          <h2>{product.product_name}</h2>
          <p> {product.description}</p>
          <p>{product.price}</p>
          <button>+</button>
          <button>-</button>
          <button onClick={makePayment}>PAY *TESTING*</button>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
