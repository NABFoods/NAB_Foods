import React from 'react';
import react, { FC } from 'react';
import TaskBar from '../TaskBar';
import FoodCard from '../FoodCard';

const Preprep: FC = () => {
  return (
    <>
      <TaskBar />
      <FoodCard type={'Prep'} />
    </>
  );
};

export default Preprep;
