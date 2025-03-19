import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodInfo } from '../homeSlice';
import { RootState } from '../../store';
const FoodCard: FC = () => {
  const product_name = useSelector((state: RootState) => state.home.foodCard);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.menu);
        dispatch(getFoodInfo(data.menu));
        console.log('FROM USE SELECTOR', product_name[0]);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  }, [dispatch]);

  return (
    <>
      <div className='FoodCard'>
        <h2>Banana</h2>
        <p> Lorem Ipsum Dolar</p>
        <p>Price: $1.00</p>
        <button>+</button>
      </div>
    </>
  );
};

export default FoodCard;
