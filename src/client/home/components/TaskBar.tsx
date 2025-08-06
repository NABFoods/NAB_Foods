import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router';
import nabFoodsLogo from '../assets/nabFoodsLogo.jpeg';
import Menu from './menu/Menu';

import CartIcon from '../../cart/CartIcon';
import { motion, useScroll } from 'motion/react';
const TaskBar: FC = () => {
  // const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  // // const goToCart = () => {
  // //   navigate('/cart');
  // // };

  return (
    <>
      <div className='pt-px-5 h-16 md:h-20 text-[#DB162F] p-4 flex justify-between items-center uppercase bg-white w-full fixed top-0 left-0 z-50'>
        <div className='hidden md:flex gap-4 items-center flex-1 hover:underline'>
          <Link to='/'>Homepage</Link>
        </div>
        <div className='text-2xl md:font-bold flex-1 '>
          <Link
            to='/'
            //className='h-12 text-4xl font-bold text-[#DB162F] mb-4 px-4 flex items-center justify-center text-center md:text-base cursor-pointer'
          >
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              src={nabFoodsLogo}
              alt=''
              className='object-contain w-20 lg:w-24 cursor-pointer'
            />
          </Link>
        </div>
        <div className='md:hidden'>
          <Menu />
        </div>
        <div className='hidden md:flex gap-4 items-center justify-content:endflex-1'>
          <Link to='/menu' className='hover:underline'>
            Menu
          </Link>
          <div className=' flex items-center gap-2 cursor-pointer hover:underline'>
            <CartIcon />
          </div>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 50,
          left: 0,
          right: 0,
          height: 20,
          originX: 0,
          backgroundColor: '#c59299',
        }}
        className='md:hidden'
      ></motion.div>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 65,
          left: 0,
          right: 0,
          height: 20,
          originX: 0,
          backgroundColor: '#c59299',
        }}
        className='max-md:hidden'
      ></motion.div>
    </>
  );
};

export default TaskBar;
