import React, { FC, useEffect } from 'react';

const OrderCard: FC = () => {
  return (
    <>
      <div className='OrderCard'>
        <h2>Order</h2>
        <p> Customer Id: 1937</p>
        <p> Customer: "BOB"</p>
        <p> Address: 1492 Codesmith st </p>
        <p> Phone: (818)244-0455</p>
        <p> Items: 2x bananas 3x apples </p>
        <p> Total: $14 </p>
        <button>approve</button>
        <button>deny</button>
      </div>
    </>
  );
};

export default OrderCard;
