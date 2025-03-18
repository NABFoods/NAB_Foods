import React, { FC } from 'react';

const FoodCard: FC = () => {
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
