import React, { FC, useEffect, useState } from 'react';
import shito from '../assets/shito.jpg';
import springRollFlyer from '../assets/springRollFlyer.jpeg';
import springRoll from '../assets/springRolls.jpg';
import { Link } from 'react-router';
const Slider: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideItems = [
    {
      id: 1,
      title: 'African food made with love',
      img_url: shito,
    },
    {
      id: 2,
      title: 'order for pickup or delivery',
      img_url: springRollFlyer,
    },
    {
      id: 3,
      title: 'Hot, fresh, healthy ingredients ',
      img_url: springRoll,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slideItems.length - 1 ? 0 : (prev += 1)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className='h-16 md:h-20'></div>
      <div className='flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] lg:flex-row'>
        <div className='max-md:h-[50vh] bg-[#fff6d3] flex-1 flex items-center justify-center flex-col gap-8 text-[#DB162F] font-bold'>
          <h1 className='text-5xl text-center uppercase p-4 md:text-6xl xl:text-7xl'>
            {slideItems[currentSlide].title}
          </h1>
          <button className=' bg-[#DB162F] text-white py-4 px-8'>
            <Link to='/menu'>ORDER NOW</Link>
          </button>
        </div>
        <div className='flex-1 w-full relative lg:h-full lg:w-1/2'>
          <img
            src={slideItems[currentSlide].img_url}
            alt=''
            className=' h-[50vh] w-full lg:h-full object-cover'
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
