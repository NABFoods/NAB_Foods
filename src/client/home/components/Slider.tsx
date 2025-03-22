import React, { FC, useEffect, useState } from 'react';
import shito from '../assets/shito.jpg';
import springRollFlyer from '../assets/springRollFlyer.jpeg';
import springRoll from '../assets/springRolls.jpg';
const Slider: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideItems = [
    {
      id: 1,
      title: 'Authentic African food made with love',
      img_url: shito,
    },
    {
      id: 2,
      title: 'place orders for pickup or delivery',
      img_url: springRollFlyer,
    },
    {
      id: 3,
      title: 'Hot and fresh taste, healthy ingredients ',
      img_url: springRoll,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slideItems.length - 1 ? 0 : (prev += 1)
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='mt-20 flex flex-col h-full md:h-[calc(100vh-5rem)] lg:flex-row'>
      <div className='flex-1 flex items-center justify-center flex-col gap-8 text-[#DB162F] font-bold'>
        <h1 className='text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl'>
          {slideItems[currentSlide].title}
        </h1>
        <button className='bg-fuchsia-50 text-[#DB162F] py-4 px-8'>
          ORDER NOW
        </button>
      </div>
      <div className='w-full flex-1 relative'>
        <img
          src={slideItems[currentSlide].img_url}
          alt=''
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Slider;
