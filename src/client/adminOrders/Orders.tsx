import OrderCard  from './components/OrderCard';
import MenuBar from './components/MenuBar';
import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { getOrders } from './orderSlice';
import AdminNavbar from "../adminHome/components/AdminNavbar"

const Orders: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getOrders')
        const data = await response.json()
        console.log(data.orders)
        dispatch(getOrders(data.orders))
        
      } catch (error) {
      console.error('error fetching orders',error)
    };
    } 
  fetchOrders()
  },[dispatch])
  return (
    <>
      {/* <MenuBar /> */}
      <AdminNavbar />
      <OrderCard />
    </>
  );
};

export default Orders;
