import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  addToCart,
  removeFromCart,
  selectTotalQuantity,
} from '../../cart/cartSlice';
import { useAppDispatch } from '../../hooks';
import { updateAmount } from '../homeSlice';
import TaskBar from './TaskBar';

const FoodCard: FC = () => {
  const [fullText, setFullText] = useState(false);
  const itemNumber = useSelector((state: RootState) => state.cart.items);
  const product = useSelector((state: RootState) => state.home.foodCard);
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  const dispatch = useAppDispatch();

  const addFoodItem = (product: { product_name: string }) => {
    dispatch(addToCart(product.product_name));
    dispatch(selectTotalQuantity());
  };

  const removeFoodItem = (product: { product_name: string }) => {
    dispatch(removeFromCart(product.product_name));
    dispatch(selectTotalQuantity());
  };

  useEffect(() => {
    dispatch(updateAmount(itemNumber));
  }, [itemNumber, quantity, dispatch]);

  return (
    <div className='flex flex-wrap my-14 lg:my-20'>
      <TaskBar />
      {Object.values(product).map((product) => (
        <div
          key={product.id}
          className='flex w-full h-auto border-b-2 border-r-2 sm:w-1/2 lg:w-1/3 bg-white justify-between items-stretch gap-4 p-4 rounded-md'
        >
          <div className='flex flex-col flex-1'>
            <h1 className=' lg:text-lg uppercase font-semibold text-wrap'>
              {product.product_name}
            </h1>
            <p className='lg:text-base text-gray-400 font-bold mb-1'>
              ${product.price}
            </p>
            <div className='overflow-y-auto max-h-16 lg:max-h-32'>
              <p
                className={`text-xs text-gray-600 lg:text-lg ${
                  fullText ? '' : 'line-clamp-3'
                }  w-12 md:w-22 lg:w-40 text-wrap `}
                onClick={() => setFullText(!fullText)}
              >
                {product.description}
              </p>
            </div>
          </div>
          <div className='relative p-2'>
            {product.img_url && (
              <img
                src={`${product.img_url}`}
                className='w-full  max-w-[400px] max-h-16 lg:max-h-44 object-contain  rounded-md'
                alt={product.product_name}
              />
            )}
            <div className='absolute bottom-[0.80rem] right-2 flex gap-2 lg:bottom-2'>
              <button
                onClick={() => addFoodItem(product)}
                className='text-sm uppercase bg-[#E3B505] text-white p-[0.2rem] lg:p-2 rounded-full z-5 hover:bg-[#e3d391] active:bg-[#746112]'
              >
                +
              </button>
              <button
                onClick={() => removeFoodItem(product)}
                className={`text-sm uppercase bg-[#ef7e32] text-white p-[0.2rem] lg:p-2 rounded-full z-5 hover:bg-[#dfa37b] active:bg-[#DB162F]`}
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
