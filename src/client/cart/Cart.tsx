// Component corresponding to order_products table tracking products added to cart

import React, { useState, useEffect } from 'react';
import icon from '../home/assets/restaurant.png';
import { useAppSelector, useAppDispatch } from '../hooks'; // typed versions of userSelector & useDispatch from hooks.ts
import { RootState } from '../store';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, selectTotalQuantity } from './cartSlice';

export function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  // console.log('ITEMS', items);
  // console.log('ITEMS OBJECT ENTRIES', Object.entries(items));
  const [missingInfo, setMissingInfo] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: 0,
  });
  const [unhide, setUnhide] = useState(false);
  const [pickup, setPickup] = useState(false);

  // Retrieve other cart and menu state.
  const quantity = useAppSelector((state: RootState) => state.cart.quantity);
  const foodCard = useAppSelector((state: RootState) => state.home.foodCard);

  // Compute current subtotal based on items in cart.

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
  // Handle customer info form changes.
  const handleCustomerInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleHide = () => {
    setUnhide(true);

    setTimeout(() => {
      setUnhide(false);
    }, 3000);
  };

  // Checkout function constructs order data and posts it to the API.
  const checkoutButton = async () => {
    console.log(items);
    if (customerInfo.name.trim() === '') {
      handleHide();
      setMissingInfo('name');
      return;
    } else if (customerInfo.address.trim() === '' && !pickup) {
      handleHide();
      setMissingInfo('address');
      return;
    } else if (
      customerInfo.phone === 0 &&
      customerInfo.toString().trim().length >= 10
    ) {
      handleHide();
      setMissingInfo('phone');
      return;
    } else {
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
    }
  };

  // for getting total price
  // const totalPrice = useAppSelector(getTotalPrice);
  // Use to know if customer has ordered....??
  // const checkoutState = useAppSelector((state) => state.cart.checkoutState);

  console.log('THIS IS ITEMS', items);

  return (
    <>
      <div className='h-[100vh] md:h-calc(100vh-9rem)] flex flex-col text-[#DB162F] lg:flex-row'>
        <div
          className={`flex flex-row justify-center w-full top-0 fixed ${
            unhide ? '' : 'hidden'
          } lg:text-xl`}
        >
          <p className='bg-red-400 text-white rounded-sm p-2 z-10'>
            Please provide {`${missingInfo}`}
          </p>
        </div>
        <div className='h-1/2 p-4 flex flex-col overflow-scroll lg:h-full lg:w-full 2xl:w-1/2'>
          <div className='w-full h-12 p-2'>
            <Link to='/'>
              <button>{'<BACK'}</button>
            </Link>
          </div>
          {Object.entries(items).map((item, idx) => (
            <>
              <div
                className='h-1/2 p-4 flex flex-col lg:justify-center lg:h-full lg:w-full 2xl:w-1/2 '
                key={idx}
              >
                {/* // Products Container */}
                <div className='flex items-center justify-between gap-5'>
                  <div className='w-12 h-12 flex-shrink-0 lg:w-20 lg:h-20'>
                    <img
                      src={icon}
                      alt={item[1][3]}
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <div className='flex-grow'>
                    <h2 className='text-lg font-semibold uppercase'>
                      {item[1][3]}
                    </h2>
                    <p className='text-gray-600'>
                      ${Math.round(item[1][2] * 100) / 100}
                    </p>
                  </div>
                  <div className='flex flex-col md:flex-row md:justify-between lg:gap-5'>
                    <button
                      className='cursor-pointer lg:text-xl'
                      onClick={() =>
                        dispatch(
                          addToCart({
                            product_id: item[0],
                            product_name: item[1][3],
                            price: item[1][0],
                          })
                        )
                      }
                    >
                      +
                    </button>
                    <span className=' bg-fuchsia-50 p-2 rounded-md lg:text-xl'>
                      {item[1][0]}
                    </span>
                    <button
                      className='cursor-pointer lg:text-xl'
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            product_id: item[0],
                            product_name: 'Needs to be fixed',
                            price: item[1][0],
                          })
                        )
                      }
                    >
                      {item[1][0] <= 1 ? 'X' : '-'}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        {/* Payments Container */}
        <div className='max-h-2/3 p-4 bg-fuchsia-50 flex flex-col gap-2 justify-center lg:px-20 lg:h-full lg:w-[40%] 2xl:w-1/2 2xl:text-xl 2xl:gap-6'>
          <div className='flex gap-2 items-start'>
            <button
              className={`${
                !pickup ? 'bg-[#DB162F]' : 'bg-[#e7939e]'
              } text-white p-1 rounded-md w-1/2 self-end`}
              onClick={() => setPickup(true)}
            >
              PICKUP
            </button>
            <button
              className={`${
                pickup ? 'bg-[#DB162F]' : 'bg-[#e7939e]'
              } text-white p-1 rounded-md w-1/2 self-end`}
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
                type='number'
                className='input-field text-black'
                name='phone'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
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
          <div className='flex justify-between'>
            <span>Subtotal({quantity})</span>
            <span>${Math.round(currentSubtotal() * 100) / 100}</span>
          </div>
          <div className='flex justify-between'>
            <span>Service Cost({quantity})</span>
            <span>$0.00</span>
          </div>
          <div className={`flex justify-between ${pickup ? 'hidden' : ''}`}>
            <span>Delivery Cost({quantity})</span>
            <span className='text-green-500'>Free</span>
          </div>
          <hr className='my-2' />
          <div className='flex justify-between'>
            <span>TOTAL({quantity})</span>
            <span className='font-bold'>
              ${Math.round(currentSubtotal() * 100) / 100}
            </span>
          </div>
          <button
            onClick={checkoutButton}
            className='bg-[#DB162F] text-white p-3 rounded-md w-1/2 self-end'
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
