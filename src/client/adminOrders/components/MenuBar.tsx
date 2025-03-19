import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuBar: FC = () => {
    const navigate = useNavigate();
    return (
      <>
        <button onClick={() => navigate('/adminMenu')}>Menu</button>
      </>
    );
}
export default MenuBar