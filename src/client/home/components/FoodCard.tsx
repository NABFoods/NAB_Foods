import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { addToCart, removeFromCart } from '../../cart/cartSlice';

import { RootState } from '../../store';
const FoodCard: FC = () => {
  const product = useSelector((state: RootState) => state.home.foodCard);
  const dispatch = useAppDispatch();

  const addFoodItem = (index: number, product: {product_name:string }) => {
    console.log("Adding Food Item", index)
    // console.log(product)
    dispatch(addToCart(product.product_name))
  }

  const removeFoodItem = (index: number, product:{product_name: string}) => {
    console.log("Adding Food Item", index)
    // console.log(product)
    dispatch(removeFromCart(product.product_name))
  }
 

  return (
    <>
      {Object.values(product).map((product, idx) => (
        <div className='FoodCard' key={idx}>
          <h2>{product.product_name}</h2>
          <p> {product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => addFoodItem(idx, product)}>+</button>
          <button onClick={() => removeFoodItem(idx, product)}>-</button>
        </div>
      ))}
    </>
  );
};

export default FoodCard;
