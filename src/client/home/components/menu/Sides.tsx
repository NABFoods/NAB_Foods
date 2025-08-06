import React, { FC } from 'react';
import FoodCard from '../FoodCard';
import TaskBar from '../TaskBar';

const Sides: FC = () => {
  return (
    <>
      <TaskBar />
      <FoodCard type={'Side'} />
    </>
  );
};

export default Sides;
