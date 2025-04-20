import React, { FC } from 'react';
import FoodCard from '../FoodCard';
import TaskBar from '../TaskBar';

const Entrees: FC = () => {
  return (
    <>
      <TaskBar />
      <FoodCard />
    </>
  );
};

export default Entrees;
