import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import nabFoodsLogo from '../..//home/assets/nabFoodsLogo.jpeg';
import LogoutButton from '../../adminLogin/LogoutButton'

const AdminNavbar: FC = () => {
  const navigate = useNavigate();
  // Use 
  const location = useLocation();

  // Keep track of where user is currently using useLocation whether it has a trailing / or not.  Applying regex may be a more scalable solution
  const isOnAdminHome = location.pathname === '/adminHome' || location.pathname === '/adminHome/';


  return (
    <div className="">
    {/* Using md (medium size screens & above - >=768px width) breakpoint to use flex-row (keeping image and title text inline), defaulting to flex-col to stack image and title text for all other/smaller screens*/}
      <h1 className='flex items-center justify-between md:flex-row flex-col bg-white text-[#DB162F] text-3xl font-semibold p-2 border-b-2 border-b-[#c59299]'>
        <img
          className='object-contain w-20'
          src={nabFoodsLogo}
          alt=''
          />
        <span className='flex-1 text-center'>Manage Products Dashboard</span>
        {/* <button
          className='w-fit text-xs bg-[#DB162F] text-white mb-1 mt-1 px-1 py-1.5 rounded-md hover:bg-blue-700'
          onClick={() => navigate(isOnAdminHome ? '/Orders' : '/adminHome")}
        >
          {isOnAdminHome ? 'Orders' : 'Menu'}
        </button> */}
        <span className="text-sm py-0">
        <LogoutButton />
        </span>
      </h1>
          </div>
  );
};

export default AdminNavbar;
