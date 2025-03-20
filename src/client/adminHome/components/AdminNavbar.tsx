import React, { FC } from 'react';
import { useNavigate } from 'react-router';

const AdminNavbar: FC = () => {
  const navigate = useNavigate()
    return (
    <>
      <h1 className='flex justify-center bg-gray-100 text-3xl font-semibold p-2' >NAB FOODS Admin Dashboard</h1>
      <p> 
      <button 
      className="bg-blue-500 text-white ml-4 mb-1 px-2 py-2 rounded-md hover:bg-blue-700"
 onClick ={() => navigate('/Orders')}>Go To Orders</button>
      </p>
    </>
  );
};

export default AdminNavbar;