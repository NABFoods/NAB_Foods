import React, { FC } from 'react';
import icon from '../assets/restaurant.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../../types';
const Featured: FC = () => {
  const featuredItems = useSelector((state: RootState) => state.home.foodCard);

  return (
    <div className='w-screen overflow-x-scroll text-[#DB162F]'>
      <div className='w-max flex'>
        {Object.values(featuredItems).map((product: Product) => (
          <div
            key={product.id}
            className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-[#ffea98] transition-all duration-500'
          >
            <div className='relative flex-1 w-full hover:scale-125 transition-all duration-500'>
              <img
                src={product.img_url ? `${product.img_url}` : `${icon}`}
                alt=''
                className='object-contain'
              />
            </div>
            <div className='flex-1 flex flex-col item-center text-center gap-4'>
              <h1 className='text-xl font-bold uppercase'>
                {product.product_name}
              </h1>
              <p className='p-4 line-clamp-2'>{product.description}</p>
              <span className='text-gray-600 text-xl'>${product.price}</span>
              <button className='bg-[#E3B505] text-white p-2 rounded-md'>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
