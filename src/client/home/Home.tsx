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
  const foodCard = useSelector((state: RootState) => state.home.foodCard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(foodCard).length === 0) {
      fetch('http://localhost:3000/api')
        .then((response) => response.json())
        .then((data) => {
          //console.log(data.menu);
          dispatch(getFoodInfo(data.menu));
        })
        .catch((error) => {
          console.error('Error fetching products: ', error);
        });
    }
  }, [dispatch, foodCard]);

  return (
    <>
      <TaskBar />
      <Slider />
      <Featured />
      <Offer />
      <Footer />
    </>
  );
};

export default Home;
