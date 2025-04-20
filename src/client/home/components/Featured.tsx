import React, { FC } from 'react';
import icon from '../assets/restaurant.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../../types';
import { addToCart, selectTotalQuantity } from '../../cart/cartSlice';
const Featured: FC = () => {
  const featuredItems = useSelector((state: RootState) => state.home.foodCard);
  const dispatch = useDispatch();

  const addFoodItem = (product: {
    id: string;
    product_name: string;
    price: number;
  }) => {
    dispatch(
      addToCart({
        product_id: product.id,
        product_name: product.product_name,
        price: product.price,
      })
    );
    dispatch(selectTotalQuantity());
  };
  return (
    <div className='w-screen overflow-x-scroll text-[#DB162F]'>
      <div className='w-max flex'>
        {Object.values(featuredItems).map((product: Product) => (
          <div
            key={product.id}
            className='w-screen h-[65vh] flex flex-col items-center justify-around p-4 hover:bg-[#fff6d3] transition-all duration-500 md:w-[50vw] xl:w-[33vw] xl:h-[80vh]'
          >
            <div className='relative flex-1 w-full hover:scale-125 transition-all duration-500'>
              <img
                src={product.img_url ? `${product.img_url}` : `${icon}`}
                alt=''
                className='object-contain h-[25vh] w-full md:h-[30vh] xl:h-[50]'
              />
            </div>
            <div className='flex-1 flex flex-col item-center text-center gap-4 w-full'>
              <h1 className='text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl'>
                {product.product_name}
              </h1>
              <p className='p-4 2xl:p-8'>
                <div className='max-xl:line-clamp-2 max-xl:h-12 xl:h-[17vh]'>
                  {product.description}
                </div>
              </p>
              <div className='flex flex-col items-center'>
                <span className='text-gray-600 text-xl'>${product.price}</span>
                <button
                  onClick={() =>
                    addFoodItem({
                      id: String(product.id),
                      product_name: product.product_name,
                      price: product.price,
                    })
                  }
                  className='bg-[#E3B505] text-white p-2 rounded-md w-1/2'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
