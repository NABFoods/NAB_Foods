import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ( useDispatch ) from 'react-redux';
import { useAppDispatch } from '../hooks'; // import typed useDispatch from hooks.ts
import AdminNavbar from './components/AdminNavbar';
import AdminFoodCard from './components/AdminFoodCard';
import { receivedProducts } from '../product/productsSlice';

const AdminHome: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetching data from the API and dispatching action to store it in Redux state
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => {
        // Dispatch the action to update the products state
        dispatch(receivedProducts(data.menu)); // Assuming data.menu is the array of products
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  const handleAddProduct = () => {
    console.log("Add Product Clicked!");
  }

  return (
    <div>
      <AdminNavbar />
      <button onClick={() => handleAddProduct}>Add Product</button>
      <AdminFoodCard />
    </div>
  );
};

export default AdminHome;
