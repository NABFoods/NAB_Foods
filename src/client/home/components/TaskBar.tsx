import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-CvttGpNz';

const TaskBar: FC = () => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart')
  }

  return (
    <>
      <h1>NAB FOODS</h1>
      <button onClick={goToCart}>CART</button>
    </>
  );
};

export default TaskBar;
