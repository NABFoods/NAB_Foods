import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { RootState } from '../store';
import { Link } from 'react-router';
const SuccessPage: FC = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const customerInfo: any = JSON.parse(
    localStorage.getItem('customerDetails')!
  );
  const orderProducts: any = JSON.parse(localStorage.getItem('products')!);
  const pickup = useAppSelector((state: RootState) => state.cart.pickup);
  useEffect(() => {
    if (!customerInfo || typeof customerInfo != 'object') {
      return;
    }

    const currentSubtotal = () => {
      const itemsArray = Object.entries(items);
      let subtotal = 0;
      for (let i = 0; i < itemsArray.length; i++) {
        // item[1] is assumed to be an array: [quantity, price, total]
        subtotal += itemsArray[i][1][2];
      }
      return subtotal;
    };

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

    const fetchFunction = async () => {
      if (
        orderData.name === '' ||
        orderData.phone === 0 ||
        orderData.products.length === 0
      ) {
        // console.log(orderData);
        console.error('Failed to create order, there is an empty field');
        return false;
      }
      const response = await fetch('http://localhost:3000/api/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (await response.json()) {
        return true;
      }
      console.error('failed to create order');
      return false;
    };

    const createMessage = async () => {
      const response = await fetch('http://localhost:3000/createMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: orderData.phone,
          message: `Your order has been placed successfully and is now waiting for confirmation.`,
        }),
      });
      if (await response.json()) {
        return true;
      }
      console.error('failed to create message');
      return false;
    };
    createMessage();
    fetchFunction();
    localStorage.clear();
  }, []);
  return (
    <>
      <div className='h-[100vh] w-[100vw] bg-green-200 flex-col'>
        <div className='text-2xl h-[50vh] text-green-600'>
          <Link to='/'>{`<Back`}</Link>
        </div>
        <div className='flex h-[50vh] justify-center'>
          <p className='text-xl bold text-green-800'>
            Payment successfully process waiting for approval
          </p>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
