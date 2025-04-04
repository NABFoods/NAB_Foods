// Component corresponding to order_products table tracking products added to cart

import React, { useState, useEffect } from 'react';
import icon from '../home/assets/restaurant.png';
import { useAppSelector, useAppDispatch } from '../hooks'; // typed versions of userSelector & useDispatch from hooks.ts
import { RootState } from '../store';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  selectTotalQuantity,
} from './cartSlice';
import { updateAmount } from '../home/homeSlice';
import TaskBar from '../home/components/TaskBar';

export function Cart() {
  const dispatch = useAppDispatch();
  const header = { 'Content-Type': 'application/json' };

  // Retrieve cart items from Redux.
  // Items object keys are product_id strings.
  const items = useAppSelector((state: RootState) => state.cart.items);
  console.log('ITEMS', items);
  console.log('ITEMS OBJECT ENTRIES', Object.entries(items));

  // Customer details and pickup flag state.
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: 0,
  });
  const [pickup, setPickup] = useState(false);

  // Retrieve other cart and menu state.
  const quantity = useAppSelector((state: RootState) => state.cart.quantity);
  const foodCard = useAppSelector((state: RootState) => state.home.foodCard);

  // Compute current subtotal based on items in cart.
  const currentSubtotal = () => {
    const itemsArray = Object.entries(items);
    let subtotal = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      // item[1] is assumed to be an array: [quantity, price, total]
      subtotal += itemsArray[i][1][2];
    }
    return subtotal;
  };

  // Update total quantity whenever items change.
  useEffect(() => {
    dispatch(selectTotalQuantity());
  }, [items, quantity, dispatch]);

  // Stripe key for payment (adjust as needed).
  const StripeKey =
    'pk_test_51R4BAm4GalmXqpbjXbMWtRvaxsHke16qEuJEEWZc8KblTZrB88vYN8wyaDlJ1dPV045a4R7FlqRPrjRmYouQZcfO00WlfTE16F';

  // Payment function using Stripe.
  const makePayment = async () => {
    // Convert foodCard to an array if it isn't already
    const foodCardArray = Array.isArray(foodCard)
      ? foodCard
      : Object.values(foodCard);
    const cartProductIds = Object.keys(items);
    // Filter to only include products that are in the cart
    const selectedProducts = foodCardArray.filter((product: any) =>
      cartProductIds.includes(product.id)
    );
    console.log('selected products', selectedProducts);
    // Attach the quantity from the cart to each selected product
    const productsWithQuantity = selectedProducts.map((product: any) => ({
      ...product,
      quantity: items[product.id][0], // cart quantity stored at index 0
    }));

    const stripe = await loadStripe(StripeKey);
    const body = {
      products: productsWithQuantity, // send only the selected cart items
      defaultImage: `../home/assets/restaurant.png`,
    };
    const response = await fetch(`http://localhost:3000/api/createCheckout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  // Handle customer info form changes.
  const handleCustomerInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Checkout function constructs order data and posts it to the API.
  const checkoutButton = async () => {
    // Build order products array from items in the cart.
    const orderProducts = Object.entries(items).map(
      ([productID, productData]) => ({
        product_id: productID, // productID as key
        product_quantity: productData[0], // quantity stored in index 0
        product_subtotal: productData[2], // subtotal stored in index 2
      })
    );

    const orderData = {
      name: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      order_date: new Date().toISOString(),
      order_status: 'Pending',
      order_price: currentSubtotal(),
      pickup: pickup,
      products: orderProducts,
    };

    const response = await fetch('http://localhost:3000/api/createOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    console.log('result', result);
    if (result) {
      // If order creation is successful, proceed to payment.
      makePayment();
    } else {
      console.error('Failed to create order');
    }
  };

  return (
    <div className='mt-20 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-[#DB162F] lg:flex-row'>
      <TaskBar />
      {Object.entries(items).map((item, idx) => (
        <div
          key={idx}
          className='h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40'
        >
          {/* Display each product's details in the cart */}
          <div className='flex items-center justify-between mb-4'>
            <img src={icon} alt='Product Icon' width={100} height={100} />
            <div>
              {/* Here, item[0] is the product_id; if you need product name separately, adjust accordingly */}
              <h1 className='uppercase text-xl font-bold'>{item[0]}</h1>
            </div>
            {/* Display the total price for this item */}
            <h2 className='font-bold'>{item[1][2]}</h2>
            <button
              className='cursor-pointer'
              onClick={() =>
                dispatch(
                  deleteFromCart({
                    product_id: item[0],
                    product_name: item[0],
                    price: item[1][0],
                  })
                )
              }
            >
              X
            </button>
            <button
              className='cursor-pointer'
              onClick={() =>
                dispatch(
                  addToCart({
                    product_id: item[0],
                    product_name: item[0],
                    price: item[1][0],
                  })
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
                  removeFromCart({
                    product_id: item[0],
                    product_name: item[0],
                    price: item[1][0],
                  })
                )
              }
            >
              -
            </button>
          </div>
        </div>
      ))}
      {/* Payment and order summary container */}
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
          {!pickup ? (
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
          ) : (
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
          <span>${currentSubtotal()}</span>
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
          <span className='font-bold'>${currentSubtotal()}</span>
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
