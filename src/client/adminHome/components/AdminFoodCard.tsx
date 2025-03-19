import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { removeProduct } from '../../product/productsSlice';

const AdminFoodCard: FC = () => {
  //use typed useSelector from hooks.ts to pull products from store
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

    const handleRemoveProduct = async (id: number) => {
        console.log("handleRemoveProduct button clicked")
        try {
            const response = await fetch(`http://localhost:3000/api/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                dispatch(removeProduct(id));
            } else {
                console.error("AdminFoodCard- handleRemoveProduct failed to remove product");
            } 
        }
        catch (error) {
            console.error("AdminFoodCard - handleRemoveProduct catch block:  Error deleting product: ", error)
        }
    }

  return (
    <div>
      <h2>Admin Products View</h2>
      <div>
        {Object.values(products).map((product) => (
          <div key={product.id}>
            <h3>Name: {product.product_name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              Status: {product.sold_out ? 'Sold Out' : 'Available'}
              {!product.sold_out && <button>Mark sold out?</button>}
            </p>
            <button onClick = {() => handleRemoveProduct(product.id)}>Remove Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoodCard;
