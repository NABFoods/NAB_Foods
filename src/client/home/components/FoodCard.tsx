import React, { FC, useEffect} from 'react';
import { useDispatch } from 'react-redux';

const FoodCard: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/api')
    .then(response => response.json())
    .then(data => {
      console.log(data.menu)
      // dispatch(getFoodInfo(data.menu))
  })
      ;
},[])


  return (
    <>
      <div className='FoodCard'>
        <h2>Banana</h2>
        <p> Lorem Ipsum Dolar</p>
        <p>Price: $1.00</p>
        <button>+</button>
      </div>
    </>
  );
};

export default FoodCard;
