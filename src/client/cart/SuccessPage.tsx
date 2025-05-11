import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';
import { Link } from 'react-router';
let count = 0;
const SuccessPage: FC = () => {
  const customerInfo: any = JSON.parse(
    localStorage.getItem('customerDetails')!
  );
  const total: number = JSON.parse(localStorage.getItem('Total')!);
  const orderProducts: any = JSON.parse(localStorage.getItem('products')!);
  const pickup = useAppSelector((state: RootState) => state.cart.status[0]);
  useEffect(() => {
    if (!customerInfo || typeof customerInfo != 'object') {
      return;
    }

    const orderData = {
      name: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      order_date: new Date().toISOString(),
      order_status: 'Pending',
      order_price: total,
      pickup: pickup,
      products: orderProducts,
    };

    const fetchFunction = async () => {
      if (
        orderData.name === '' ||
        orderData.phone === 0 ||
        orderData.products.length === 0
      ) {
        console.log(orderData);
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
            Payment successfully processed waiting for approval
          </p>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
