import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ( useDispatch ) from 'react-redux';
import { useAppDispatch } from '../hooks'; // import typed useDispatch from hooks.ts
import AdminNavbar from './components/AdminNavbar';
import AdminFoodCard from './components/AdminFoodCard';
import { receivedProducts } from '../product/productsSlice';

const AdminHome: FC = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    price: 0,
    sold_out: false,
    description: '',
    img_url: '',
  });

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

  const handleAddProductClick = () => {
    console.log("Add Product Button Clicked!");
    // Toggle from default false to true to show add product form
    setShowForm(true);
  }

  const handleAddProductFormChange = () => {
    console.log("adminHome.tsx - handleProductFormChange invoked")
  } 

  const handleSubmitNewProduct = () => {
    console.log("AdminHome.tsx - handleSubmitNewProduct clicked")
  }

  return (
    <div>
      <AdminNavbar />
      <button onClick={handleAddProductClick}>Add Product</button>
      <AdminFoodCard />
{/* Render add new products form if showForm = true from clickign add product button */}
{showForm && (
    <form onSubmit={handleSubmitNewProduct}>
        <input type="text" name="product_name" value={newProduct.product_name} onChange={handleAddProductFormChange} placeholder="Product Name" required />
        <input type="number" name="price" value={newProduct.price} onChange={handleAddProductFormChange} placeholder="Product Price" required />
        <textarea name="description" value={newProduct.description} onChange={handleAddProductFormChange} placeholder="Product Description" required />
        <input type="text" name="img_url" value={newProduct.img_url} onChange={handleAddProductFormChange} placeholder="Image URL" /> 

    </form>
)}

    </div>
  );
};

export default AdminHome;
