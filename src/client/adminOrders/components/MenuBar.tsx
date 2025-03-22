import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuBar: FC = () => {
    const navigate = useNavigate();
    return (
      <div className="ml-2">
        <button className = "button-std" onClick={() => navigate('/adminHome')}>Menu</button>
        <h2 className="text-[#DB162F]">Orders View</h2>
      </div>
    );
}
export default MenuBar