import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import nabFoodsLogo from '../..//home/assets/nabFoodsLogo.jpeg';

const AdminNavbar: FC = () => {
  const navigate = useNavigate();
  return (
    <>
    {/* Using md (medium size screens & above - >=768px width) breakpoint to use flex-row (keeping image and title text inline), defaulting to flex-col to stack image and title text for all other/smaller screens*/}
      <h1 className='flex items-center justify-center md:flex-row flex-col bg-gray-100 text-[#DB162F] text-3xl font-semibold p-2 mr-2 ml-1'>
        <img
          className='mr-6 mu-4 object-contain w-20 cursor-pointer'
          src={nabFoodsLogo}
          alt=''
        />
        <span className='flex-1 text-center'>NAB FOODS Admin Dashboard</span>
      </h1>
      <p>
        <button
          className='bg-[#DB162F] text-white ml-4 mb-1 mt-5 px-2 py-2 rounded-md hover:bg-blue-700'
          onClick={() => navigate('/Orders')}
        >
          Go To Orders
        </button>
      </p>
    </>
  );
};

export default AdminNavbar;
