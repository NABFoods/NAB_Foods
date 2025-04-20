import React, { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  removeProduct,
  toggleSoldOut,
  updateProduct,
} from '../../product/productsSlice';
import { Product } from '../../../types';

const AdminFoodCard: FC = () => {
  //use typed useSelector from hooks.ts to pull products from store
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  // const handleCategory = (e: any) => {
  //   console.log('Running handle category');
  //   setCategory('styles');
  // };
  const handleRemoveProduct = async (id: number) => {
    console.log('handleRemoveProduct button clicked');
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
      });
      // change to if(!response.ok) to trigger adding product back
      if (response.ok) {
        dispatch(removeProduct(id)); // replace with addProduct moving removeProduct prior to fetch so UI updates immediately, but adds product back if fetch fails.
      } else {
        console.error(
          'AdminFoodCard- handleRemoveProduct failed to remove product'
        );
      }
    } catch (error) {
      console.error(
        'AdminFoodCard - handleRemoveProduct catch block:  Error deleting product: ',
        error
      );
    }
  };

  //Toggle sold out state for the product
  const handleToggleSoldOut = async (id: number, currentValue: any) => {
    console.log(
      'AdminFoodCard handleUpdateProduct - Toggle Sold Out button clicked!'
    );
    //Dispatch toggleSoldout action prior to API call to update UI w/out waiting
    dispatch(toggleSoldOut({ id, sold_out: !currentValue }));
    try {
      const response = await fetch(`http://localhost:3000/api/${id}/sold-out`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ sold_out: !currentValue }),
      });
      if (!response.ok) {
        console.error(
          'AdminFoodCard handleUpdateProduct - Failed to update product sold_out in database'
        );
      }
    } catch (error) {
      console.error(
        'AdminFoodCard handleUpdateProduct - Hit catch block - Error updating product sold_out: ',
        error
      );
    }
  };
  // Explicitly type field parameter as a type that is a key of the Product type.
  const handleUpdateProduct = async (
    id: number,
    field: keyof Product,
    currentValue: any
  ) => {
    let newValue;
    console.log('Update Product button clicked!');
    if (field != 'type') {
      newValue = prompt(`Enter a new value for ${field}:`, currentValue);
    } else {
      console.log('THIS IS CATEGORY', currentValue);
      newValue = currentValue;
    }
    if (newValue === null) return; // exits out

    try {
      const response = await fetch(
        `http://localhost:3000/api/update-product/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, value: newValue }),
        }
      );
      if (response.ok) {
        // const updatedProduct = await response.json(); // not using
        dispatch(updateProduct({ id, field, value: newValue }));
      } else {
        console.error(
          'AdminFoodCard handUpdateProduct - Failed to update product'
        );
      }
    } catch (error) {
      console.error(
        'AdminFoodCard handUpdateProduct - catch block caught error updating product: ',
        error
      );
    }
  };

  return (
    <div>
      <div className='space-y-4'>
        {Object.values(products).map((product, index) => (
          // if product.id missing (API delay?) then makes a temp key 'temp-(index)'
          //   <div key={product.id}>
          <div
            key={product.id ?? `temp-${index}`}
            className='m-2 bg-slate-100 border border-gray-300 rounded-lg p-4 shadow-xl'
          >
            <h3>
              <button
                className='button-std'
                onClick={() =>
                  handleUpdateProduct(
                    product.id,
                    'product_name',
                    product.product_name
                  )
                }
              >
                Update{' '}
              </button>
              <span className='text-[#DB162F] text-lg font-semibold'>
                Name: {product.product_name}
              </span>
            </h3>
            <p>
              <label className='flex text-lg p-2 gap-2'>
                {' '}
                Category: {product.type}
                <select
                  name='category'
                  id='category'
                  defaultValue=''
                  className=' bg-gray-400'
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    handleUpdateProduct(product.id, 'type', selectedCategory);
                  }}
                >
                  <option value=''>Select Change</option>
                  <option value='Entree'>Entree</option>
                  <option value='Side'>Side</option>
                  <option value='Prep'>Preprep</option>
                </select>
              </label>
            </p>
            <p>
              <button
                className='button-std'
                onClick={() =>
                  handleUpdateProduct(
                    product.id,
                    'description',
                    product.description
                  )
                }
              >
                Update{' '}
              </button>
              <span className='font-bold'>Description:</span>{' '}
              {product.description}
            </p>
            <p>
              <button
                className='button-std'
                onClick={() =>
                  handleUpdateProduct(product.id, 'img_url', product.img_url)
                }
              >
                Update{' '}
              </button>
              <span className='font-bold'>Image:</span> {product.img_url}
            </p>
            <p>
              <button
                className='button-std'
                onClick={() =>
                  handleUpdateProduct(product.id, 'price', product.price)
                }
              >
                Update{' '}
              </button>
              <span className='font-bold'>Price: $</span>
              {product.price}
            </p>
            <p>
              {
                <button
                  className='button-std'
                  onClick={() =>
                    handleToggleSoldOut(product.id, product.sold_out)
                  }
                >
                  Toggle
                </button>
              }
              <span className='text-black'>
                <span className='font-bold'>Status: </span>
                <span
                  className={
                    product.sold_out ? 'text-[#DB162F] font-bold' : 'text-black'
                  }
                >
                  {product.sold_out ? 'Sold Out!' : 'Available'}
                </span>
              </span>
            </p>
            <button
              className='button-std'
              onClick={() => handleRemoveProduct(product.id)}
            >
              Remove Product
            </button>
            {/* <button
              className="button-std"
              >
              Update Product
              </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoodCard;
