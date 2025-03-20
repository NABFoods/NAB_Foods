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
    <div>
      <h2>Orders View</h2>
      <ul>
        {Object.values(orders).map((order) => (
          <li key={order.order_id} className='order-card'>
            <h3>Order ID: {order.order_id}</h3>
            <p>Customer: {order.customer_name}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>
              Status: <strong>{order.order_status}</strong>
            </p>
            <p>Total: ${order.order_price}</p>
            <p>Products:</p>
            <ul>
              {order.products.map((product) => (
                <li key={product.product_id}>
                  {product.product_name} (${product.price}) x {product.quantity}{' '}
                  = ${product.subtotal}
                </li>
              ))}
            </ul>

            {/* Dynamic Status Change Buttons */}
            <div className='status-buttons'>
              <button
                onClick={() => handleStatusChange(order.order_id, 'accepted')}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(order.order_id, 'declined')}
              >
                Decline
              </button>
              <button
                onClick={() =>
                  handleStatusChange(order.order_id, 'in progress')
                }
              >
                In Progress
              </button>
              <button
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
