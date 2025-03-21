import React, { FC } from 'react';
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
    console.log('Update Product button clicked!');
    const newValue = prompt(`Enter a new value for ${field}:`, currentValue);
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
            className='m-2 bg-slate-100 border border-gray-400 rounded-lg p-4 shadow-xl'
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
              <span className='text-lg font-semibold'>
                Name: {product.product_name}
              </span>
            </h3>
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
              Description: {product.description}
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
              Price: ${product.price}
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
              Status: {product.sold_out ? 'Sold Out' : 'Available'}
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
