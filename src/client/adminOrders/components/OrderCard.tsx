import React, { FC } from 'react';
import { useAppSelector } from '../../hooks'; // Access Redux state

const OrderCard: FC = () => {
  // Use typed useSelector to pull orders from store
  const orders = useAppSelector((state) => state.orders.orders);

  console.log('Orders:', orders);

  if (!orders || Object.keys(orders).length === 0) {
    // Handle empty or undefined state
    return <p>No orders available</p>;
  }

  return (
    <div>
      <h2>Orders View</h2>
      <ul>
        {/* Loop through each order */}
        {Object.values(orders).map((order) => (
          <li key={order.order_id} className='order-card'>
            <h3>Order ID: {order.order_id}</h3>
            <p>Customer: {order.customer_name}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Status: {order.order_status}</p>
            <p>Total: ${order.order_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard
