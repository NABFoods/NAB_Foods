import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks'; // Access Redux state and actions
import { updateOrderStatus } from '../../adminOrders/orderSlice'; // Action to update order status

const OrderCard: FC = () => {
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();

  console.log('Orders:', orders);

  if (!orders || Object.keys(orders).length === 0) {
    return <p>No orders available</p>;
  }

  // Function to update order status
  const handleStatusChange = (orderId: number, newStatus: string) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  return (
    <div className='p-2 bg-gray-200'>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Object.values(orders).map((order) => (
          <li
            key={order.order_id}
            className='m-2 bg-slate-100 border border-gray-300 rounded-lg p-4 shadow-xl'
          >
            <h3 className='text-[#DB162F] font-extrabold text-2xl flex justify-center items-center'>
              <span>Order ID:</span> &nbsp; {order.order_id}
            </h3>
            <p>
              <span className='font-bold'>Customer:</span> {order.customer_name}
            </p>
            <p>
              <span className='font-bold'>Address:</span> {order.address}
            </p>
            <p>
              <span className='font-bold'>Phone:</span> {order.phone}
            </p>
            <p>
              <span className='font-bold'>Status:</span>{' '}
              {order.order_status}
            </p>
            <p>
              <span className='font-bold'>Total:</span> ${order.order_price}
            </p>
            <p>
              <span className='font-bold'>Products:</span>
            </p>
            <ul>
              {order.products.map((product) => (
                <li key={product.product_id}>
                  {product.product_name} x {product.quantity} = $
                  {product.subtotal}
                </li>
              ))}
            </ul>

            {/* Dynamic Status Change Buttons */}
            <div className='status-buttons mt-2 flex gap-2'>
              <button
                className='bg-green-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-green-600 transition'
                onClick={() => handleStatusChange(order.order_id, 'accepted')}
              >
                Accept
              </button>
              <button
                className='bg-[#DB162F] text-white px-2 py-1 rounded-lg text-xs hover:bg-[#C31427] transition'
                onClick={() => handleStatusChange(order.order_id, 'declined')}
              >
                Decline
              </button>
              <button
                className='bg-[#1098F7] text-white px-2 py-1 rounded-lg text-xs hover:bg-[#0D82D2] transition'
                onClick={() =>
                  handleStatusChange(order.order_id, 'in progress')
                }
              >
                In Progress
              </button>
              <button
                className='bg-[#000000] text-white px-2 py-1 rounded-lg text-xs hover:bg-[#333333] transition'
                onClick={() => handleStatusChange(order.order_id, 'done')}
              >
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
