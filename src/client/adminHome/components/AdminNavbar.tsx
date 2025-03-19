import React, { FC } from 'react';
import { useNavigate } from 'react-router';

const AdminNavbar: FC = () => {
  const navigate = useNavigate()
    return (
    <>
      <h1>NAB FOODS (Admin)</h1>
      <p> 
      <button onClick ={() => navigate('/Orders')}>Go To Orders</button>
      </p>
    </>
  );
};

export default AdminNavbar;