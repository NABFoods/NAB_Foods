import React, { FC } from 'react';
import { Link } from 'react-router';
const FailurePage: FC = () => {
  return (
    <>
      <div className='h-[100vh] w-[100vw] bg-red-200 flex-col'>
        <div className='text-2xl h-[50vh] text-red-500'>
          <Link to='/'>{`<Back`}</Link>
        </div>
        <div className='flex h-[50vh] justify-center'>
          <p className='text-xl bold text-red-800'>
            Payment failed please try again
          </p>
        </div>
      </div>
    </>
  );
};

export default FailurePage;
