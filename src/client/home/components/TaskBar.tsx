import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-CvttGpNz';
import menu from '../assets/menus.png';
const TaskBar: FC = () => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <div className='h-12 text-[#DB162F] p-4 flex justify-between items-center border-b-2 border-b-[#c59299] uppercase'>
        <div>
          <a
            href='/'
            //className='h-12 text-4xl font-bold text-[#DB162F] mb-4 px-4 flex items-center justify-center text-center md:text-base cursor-pointer'
          >
            NAB Foods
          </a>
        </div>
        <img src={menu} alt='Menu' width={20} height={20} />
      </div>
      <button onClick={goToCart}>CART</button>
    </>
  );
};

export default TaskBar;
