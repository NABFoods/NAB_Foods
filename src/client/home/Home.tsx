import React, { FC } from 'react';
import TaskBar from './components/TaskBar';
import FoodCard from './components/FoodCard';
const Home: FC = () => {
  return (
    <>
      <TaskBar />
      <FoodCard />
    </>
  );
};

export default Home;
