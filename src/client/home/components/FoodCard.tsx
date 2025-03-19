import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
const FoodCard: FC = () => {
  const product = useSelector((state: RootState) => state.home.foodCard);

  return (
    <>
      {Object.values(product).map((product) => (
        <div className='FoodCard'>
          <h2>{product.product_name}</h2>
          <p> {product.description}</p>
          <p>{product.price}</p>
          <button>+</button>
          <button>-</button>
        </div>
      ))}
    </>
  );
};

export default FoodCard;
