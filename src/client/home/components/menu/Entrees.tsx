import React, { FC } from 'react';
import FoodCard from '../FoodCard';
import TaskBar from '../TaskBar';

const Entrees: FC = () => {
  return (
    <>
      <TaskBar />
      <FoodCard type={'Entree'} />
    </>
  );
};

export default Entrees;
