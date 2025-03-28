import React, { FC, useEffect } from 'react';
import TaskBar from './components/TaskBar';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodInfo } from './homeSlice';
import Footer from './components/Footer';
import { RootState } from '../store';
import Featured from './components/Featured';
import Slider from './components/Slider';
import Offer from './components/Offer';
const Home: FC = () => {
  return (
    <>
      <TaskBar />
      <Slider />
      {/* <Featured />
      <Offer /> */}
      <Footer />
    </>
  );
};

export default Home;
