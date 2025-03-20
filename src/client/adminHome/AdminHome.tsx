import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ( useDispatch ) from 'react-redux';
import { useAppDispatch } from '../hooks'; // import typed useDispatch from hooks.ts
import AdminNavbar from './components/AdminNavbar';
import AdminFoodCard from './components/AdminFoodCard';
import { receivedProducts, addProduct } from '../product/productsSlice';

const AdminHome: FC = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  // lock submit button to only 1 click until submission is complete
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        console.log(data.menu);
        // Dispatch the action to update the products state
        dispatch(receivedProducts(data.menu)); // Assuming data.menu is the array of products
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  // Shows add product form if clicked.
  const handleAddProductClick = () => {
    console.log('Add Product Button Clicked!');
    // Toggle from default false to true to show add product form
    setShowForm(true);
  };

  // Collects form inputs updating NewProduct state
  const handleAddProductFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('adminHome.tsx - handleProductFormChange invoked');
    const { name, value } = e.target;
    console.log(
      `AdminHome handleAddProductForm - from e.target - name = ${name}, value= ${value}`
    );
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Submits new product based on provided form inputs
  const handleSubmitNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AdminHome.tsx - handleSubmitNewProduct clicked');
    console.log(
      'adminHome handleSubmitNewProduct - Payload being sent = ',
      newProduct
    );

    // if is submitting is true return/exit
    if (isSubmitting) {
      console.log(
        'AdminHome handleNewProductSubmit - only 1 click allowed (if submit button clicked more than once)'
      );
      return;
    }
    setIsSubmitting(true); // lock form to allow only 1 click

    // create a temp id for the new product until it can be updated from the server's response from db
    const optimisticAddProduct = {
      ...newProduct,
      id: Math.floor(Math.random() * 1000000),
    };
    // dispatch(addProduct(optimisticAddProduct));

    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        console.log('Dispatching created product to Redux: ', createdProduct.menu);
        // dispatches addProdcut again replacing whats in slice for the product w/ what came from db for the product replacing temp id w/ id from db.
        dispatch(addProduct(createdProduct.menu)); 
        // dispatch(replaceProductOptimisticIdWithRealId(...createdProduct.menu, id: optimisticAddProduct.id)); 
        setShowForm(false); //Hide add product form
        // reset form to default inputs ready for next add
        setNewProduct({
          product_name: '',
          price: 0,
          sold_out: false,
          description: '',
          img_url: '',
        });
      } else {
        console.error(
          'AdminHome.tsx handleSubmitNewProduct - Failed to add product'
        );
      }
    } catch (error) {
      console.error(
        'AdminHome handleSubmitNewProduct catch block - Error adding product: ',
        error
      );
    }
  };

  return (
    <div className='bg-gray-100'>
      <AdminNavbar />
      <button
        className='bg-blue-500 text-white px-2 ml-4 mb-2 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
        onClick={handleAddProductClick}
      >
        Add New Product
      </button>
      {/* Render add new products form if showForm = true from clicking add product button */}
      {showForm && (
        <form
        className='m-2 bg-slate-100 border border-gray-400 rounded-lg p-4 shadow-xl'
        onSubmit={handleSubmitNewProduct}
        >
          <input
            className='input-field'
            type='text'
            name='product_name'
            value={newProduct.product_name}
            onChange={handleAddProductFormChange}
            placeholder='Product Name'
            required
          />
          <input
            className='input-field'
            type='number'
            name='price'
            value={newProduct.price}
            onChange={handleAddProductFormChange}
            placeholder='Product Price'
            required
          />
          <input
            className='input-field'
            name='description'
            value={newProduct.description}
            onChange={handleAddProductFormChange}
            placeholder='Product Description'
            required
          />
          <input
            className='input-field'
            type='text'
            name='img_url'
            value={newProduct.img_url}
            onChange={handleAddProductFormChange}
            placeholder='Image URL'
          />
          <div className="py-1">
            <button
              className='bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-2 ml-1 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Submit
            </button>

          </div>
        </form>
      )}
      {/* <h2 className='text-xl font-semibold p-2'>Admin Products View</h2> */}
      <AdminFoodCard />
    </div>
  );
};

export default AdminHome;
