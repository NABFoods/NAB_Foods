import React, { FC } from 'react';
import icon from '../assets/JollofWorking.webp';
import { motion } from 'motion/react';
import { Link } from 'react-router';
const Offer: FC = () => {
  return (
    <div className='bg-black h-screen flex flex-col md:flex-row md:items-center'>
      <div className='flex-1 flex flex-col justify-center items-center text-center gap-8 p-6'>
        <h1 className='text-white text-4xl font-bold xl:text-6xl'>
          Delicious & authentic homemade Jollof
        </h1>
        <p className='text-white xl:text-xl'>
          Jollof rice is a popular West African dish characterized by its
          flavorful, tomato-based sauce and long-grain rice.
        </p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className='bg-[#E3B505] text-white rounded-md py-3 px-6'
        >
          <Link to='/menu'>ORDER NOW</Link>
        </motion.button>
      </div>
      <div className='flex-1 w-full relative'>
        <motion.img
          whileHover={{ rotate: 360 }}
          src={`${icon}`}
          alt=''
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default Offer;
