import React, { FC, useEffect } from 'react';
import TaskBar from './components/TaskBar';
import FoodCard from './components/FoodCard';
import { useDispatch } from 'react-redux';
import { getFoodInfo } from './homeSlice';
import Footer from './components/Footer';
const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.menu);
        dispatch(getFoodInfo(data.menu));
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  }, [dispatch]);

  return (
    <>
      <TaskBar />
      <FoodCard />
      <Footer />
    </>
  );
};

export default Home;
