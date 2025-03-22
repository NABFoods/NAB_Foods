import React, { FC, useEffect, useState } from 'react';
import shito from '../assets/shito.jpg';
import springRollFlyer from '../assets/springRollFlyer.jpeg';
import springRoll from '../assets/springRolls.jpg';
const Slider: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideItems = [
    {
      id: 1,
      title: 'Authentic Ghanian food made with love',
      img_url: shito,
    },
    {
      id: 2,
      title: 'You can place orders for pickup delivery or shipping',
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
    <div className='mt-20 flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row'>
      <div className='h-1/2 flex items-center justify-center flex-col gap-8 text-[#DB162F] font-bold lg:h-full'>
        <h1 className='text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl'>
          {slideItems[currentSlide].title}
        </h1>
        <button className='bg-fuchsia-50 text-[#DB162F] py-4 px-8'>
          ORDER NOW
        </button>
      </div>
      <div className='w-full h-1/2 relative lg:h-full'>
        <img
          src={slideItems[currentSlide].img_url}
          alt=''
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default Slider;
