import React, { FC } from 'react';
import TaskBar from '../TaskBar';
import { MenuPage } from '../../../../types';
import { Link } from 'react-router';
import side from '../../assets/springroll2.png';
import entree from '../../assets/ricestew.png';
import togo from '../../assets/togo.png';
import Footer from '../Footer';

const Menupage: FC = () => {
  const categories: { [id: number]: MenuPage } = {
    1: {
      categoryLink: '/menu/entree',
      title: 'Entrees',
      color: 'white',
      desc: 'Come take a look at our amazing entrees',
      bgcol: '#E03C32',
      img: entree,
    },
    2: {
      categoryLink: '/menu/side',
      title: 'Sides',
      color: 'black',
      desc: 'Complete your meal with a delicious side dish',
      bgcol: '#FFD301',
      img: side,
    },
    3: {
      categoryLink: '/menu/preprep',
      title: 'Pre-Made',
      color: 'white',
      desc: 'Pre made and ready to heat',
      bgcol: '#7BB662',
      img: togo,
    },
  };

  return (
    <>
      <TaskBar />
      <div className='my-16 md:my-20 p-4 lg:px-20 xl:px-40 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center'>
        {Object.entries(categories).map((category: any) => (
          <Link
            to={`${category[1].categoryLink}`}
            key={category[0]}
            style={{
              backgroundColor: `${category[1].bgcol}`,
            }}
            className='w-full h-1/3 bg-cover md:h-1/2'
          >
            <div
              className={`text-${category[1].color} w-full flex justify-between`}
            >
              <div className='w-1/2 p-4 md:p-8'>
                <h1 className='uppercase font-bold text-3xl'>
                  {category[1].title}
                </h1>
                <p className='text-sm my-4'>{category[1].desc}</p>
                <button
                  className={` max-md:hidden 2xl:block bg-${
                    category[1].color === 'black' ? 'black' : 'white'
                  } text-${
                    category[1].color === 'black' ? 'white' : '[#DB162F]'
                  } py-2 px-4 rounded-md`}
                >
                  Explore
                </button>
              </div>
              <div className='w-1/2 py-4 md:py-8'>
                <img
                  src={category[1].img}
                  alt=''
                  className='object-cover h-[35vh] object-[0%] '
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menupage;
