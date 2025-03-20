import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { removeProduct, toggleSoldOut } from '../../product/productsSlice';

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
            // change to if(!response.ok) to trigger adding product back
            if (response.ok) {  
                dispatch(removeProduct(id));  // replace with addProduct moving removeProduct prior to fetch so UI updates immediately, but adds product back if fetch fails.
            } else {
                console.error("AdminFoodCard- handleRemoveProduct failed to remove product");
            } 
        }
        catch (error) {
            console.error("AdminFoodCard - handleRemoveProduct catch block:  Error deleting product: ", error)
        }
    }

    //Toggle sold out state for the product
    const handleToggleSoldOut = async (id: number, currentSoldOut: boolean) => {
        console.log("AdminFoodCard handleToggleSoldOut - Toggle Sold Out button clicked!");
        //Dispatch toggleSoldout action prior to API call to update UI w/out waiting
        dispatch(toggleSoldOut({ id, sold_out: !currentSoldOut}))
        try{
            const response = await fetch(`http://localhost:3000/api/${id}/sold-out`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify({ sold_out: !currentSoldOut })
            })
            if(!response.ok) {
                console.error("AdminFoodCard handleToggleSoldOut - Failed to update product sold_out in database")
            }
        } catch (error) {
            console.error("AdminFoodCard handleToggleSoldOut - Hit catch block - Error updating product sold_out: ", error)
        }
    }

  return (
    <div>
      <h2>Admin Products View</h2>
      <div>
        {Object.values(products).map((product, index) => (
            // if product.id missing (API delay?) then makes a temp key 'temp-(index)'
        //   <div key={product.id}>
          <div key={product.id ?? `temp-${index}`}>
            <h3>Name: {product.product_name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              Status: {product.sold_out ? 'Sold Out' : 'Available'}
              {<button onClick={() => handleToggleSoldOut(product.id, product.sold_out)}>Sold Out Toggle</button>}
            </p>
            <button onClick = {() => handleRemoveProduct(product.id)}>Remove Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoodCard;
