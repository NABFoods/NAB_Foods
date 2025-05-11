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
  selectTotalQuantity,
  updateCustomerInfo,
  updateStatus,
} from './cartSlice';

export function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.cart.items);
  const products = useAppSelector((state: RootState) => state.home.foodCard);
  const customerInfo = useAppSelector(
    (state: RootState) => state.cart.customerData
  );
  const [missingInfo, setMissingInfo] = useState('');
  const [unhide, setUnhide] = useState(false);
  const status = useAppSelector((state: RootState) => state.cart.status);
  // const pickup = useAppSelector((state: RootState) => state.cart.status.pickup);
  // const shipping = useAppSelector(
  //   (state: RootState) => state.cart.status.shipping
  // );
  // const delivery = useAppSelector(
  //   (state: RootState) => state.cart.status.delivery
  // );
  // Retrieve other cart and menu state.
  const quantity = useAppSelector((state: RootState) => state.cart.quantity);
  const foodCard = useAppSelector((state: RootState) => state.home.foodCard);

  // Compute current subtotal based on items in cart.

  // Compute current subtotal based on items in cart.
  const currentSubtotal = (): number => {
    const itemsArray = Object.entries(items);
    let subtotal = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      // item[1] is assumed to be an array: [quantity, price, total]
      subtotal += itemsArray[i][1][2];
    }
    return subtotal;
  };

  const shippedSubtotal = (): number => {
    const itemsArray = Object.entries(items);
    let subtotal = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      console.log('ITEMS ARRAY ELEMENTS: ', itemsArray[i][0]);
      console.log('Products: ', products);
      if (products[Number(itemsArray[i][0])].type === 'Prep') {
        subtotal += itemsArray[i][1][2];
      }
    }
    console.log('SHIPPING SUBTOTAL: ', subtotal);
    return subtotal;
  };

  const shippingPrice = (subtotal: number): number => {
    if (subtotal <= 10 && subtotal != 0) {
      return 1.5;
    } else {
      return Math.ceil((((subtotal * 10) / 100) * 100) / 100);
    }
  };

  const shipping = shippingPrice(shippedSubtotal());

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
    //console.log('selected products', selectedProducts);
    // Attach the quantity from the cart to each selected product
    const productsWithQuantity = selectedProducts.map((product: any) => ({
      ...product,
      quantity: items[product.id][0], // cart quantity stored at index 0
    }));

    const stripe = await loadStripe(StripeKey);

    const body = {
      products: productsWithQuantity, // send only the selected cart items
      defaultImage: `../home/assets/restaurant.png`,
      shipping: { shippingCost: shipping, shippingCheck: status[2] },
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

  const handleHide = () => {
    setUnhide(true);

    setTimeout(() => {
      setUnhide(false);
    }, 3000);
  };

  // Checkout function constructs order data and posts it to the API.
  const checkoutButton = async () => {
    // console.log(items);
    if (customerInfo.name.trim() === '') {
      handleHide();
      setMissingInfo('name');
      return;
    } else if (customerInfo.address.trim() === '' && !status[0]) {
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

      // const orderData = {
      //   name: customerInfo.name,
      //   address: customerInfo.address,
      //   phone: customerInfo.phone,
      //   order_date: new Date().toISOString(),
      //   order_status: 'Pending',
      //   order_price: currentSubtotal(),
      //   pickup: pickup,
      //   products: orderProducts,
      // };

      // const response = await fetch('http://localhost:3000/api/createOrder', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData),
      // });

      // const result = await response.json();
      // console.log('result', result);
      // // If order creation is successful, proceed to payment.
      // if (result) {
      localStorage.setItem('customerDetails', JSON.stringify(customerInfo));
      localStorage.setItem('products', JSON.stringify(orderProducts));
      localStorage.setItem(
        'Total',
        JSON.stringify(currentSubtotal() + shipping)
      );
      makePayment();
      // } else {
      //   console.error('Failed to create order');
      // }
    }
  };

  // for getting total price
  // const totalPrice = useAppSelector(getTotalPrice);
  // Use to know if customer has ordered....??
  // const checkoutState = useAppSelector((state) => state.cart.checkoutState);

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
                      src={
                        products[Number(item[0])].img_url
                          ? products[Number(item[0])].img_url
                          : icon
                      }
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
            {/* <button
              className={`${
                !status[0] ? 'bg-[#DB162F]' : 'bg-[#e7939e]'
              } text-white p-1 rounded-md w-full self-end`}
              onClick={() => dispatch(updateStatus(0))}
            >
              PICKUP
            </button> */}
            {/* <button
              className={`${
                !status[1] ? 'bg-[#DB162F]' : 'bg-[#e7939e]'
              } text-white p-1 rounded-md w-1/2 self-end`}
              onClick={() => dispatch(updateStatus(1))}
            >
              DELIVERY
            </button> */}

            {/* {shippedSubtotal() != 0 && (
              <button
                className={`${
                  !status[2] ? 'bg-[#DB162F]' : 'bg-[#e7939e]'
                } text-white p-1 rounded-md w-[50px] self-end`}
                onClick={() => dispatch(updateStatus(2))}
              ></button>
            )} */}
          </div>
          {/* {status[1] === true && (
            <div className='flex flex-col'>
              <h1>Delivery Details</h1>
              <input
                type='text'
                className='input-field text-black'
                name='name'
                placeholder='Name'
                onChange={(e) =>
                  dispatch(
                    updateCustomerInfo({ field: 'name', value: e.target.value })
                  )
                }
              />
              <input
                type='text'
                className='input-field text-black'
                name='address'
                placeholder='Address'
                onChange={(e) =>
                  dispatch(
                    updateCustomerInfo({
                      field: 'address',
                      value: e.target.value,
                    })
                  )
                }
              />
              <input
                type='number'
                className='input-field text-black'
                name='phone'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                placeholder='Phone'
                onChange={(e) =>
                  dispatch(
                    updateCustomerInfo({
                      field: 'phone',
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
          )} */}

          <div className='flex flex-col'>
            <h1>Pickup Details</h1>
            <input
              type='text'
              className='input-field text-black'
              name='name'
              placeholder='Name'
              onChange={(e) =>
                dispatch(
                  updateCustomerInfo({ field: 'name', value: e.target.value })
                )
              }
            />
            <input
              type='text'
              className='input-field text-black'
              name='phone'
              placeholder='Phone'
              onChange={(e) =>
                dispatch(
                  updateCustomerInfo({
                    field: 'phone',
                    value: e.target.value,
                  })
                )
              }
            />
            {status[2] && (
              <input
                type='text'
                className='input-field text-black'
                name='address'
                placeholder='Address'
                onChange={(e) =>
                  dispatch(
                    updateCustomerInfo({
                      field: 'address',
                      value: e.target.value,
                    })
                  )
                }
              />
            )}
          </div>

          {shippedSubtotal() != 0 && (
            <div className='flex justify-between'>
              <span>Shipping?</span>
              <button
                className={`${
                  !status[2] ? 'border-2 border-red-500' : 'bg-red-500'
                } text-white p-1 rounded-md w-[20px] h-[20px]`}
                onClick={() => dispatch(updateStatus(2))}
              ></button>
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
          <div
            className={`flex justify-between ${
              !status[2] || shippedSubtotal() === 0 ? 'hidden' : ''
            }`}
          >
            <span>Shipping & Handling</span>
            <span className='text-gray-500'>${shipping}</span>
          </div>
          <hr className='my-2' />
          <div className='flex justify-between'>
            <span>TOTAL({quantity})</span>
            {status[0] && (
              <span className='font-bold'>
                $ {Math.round(currentSubtotal() * 100) / 100}
              </span>
            )}
            {status[2] && (
              <span className='font-bold'>
                ${shipping + Math.round(currentSubtotal() * 100) / 100}
              </span>
            )}
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
