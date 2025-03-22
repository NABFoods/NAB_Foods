import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import LoginButton from './LoginButton'

const AdminLogin: FC = () => {



  return (
    <div className='flex justify-center p-6 min-h-screen bg-gray-100'>
      <div className='text-[#DB162F] text-center'>
        <span className="mb-4 block text-2xl font-bold">
        Welcome NAB Foods Admin!
        <br />
        Please login.
        </span>
        {/* <input
          className='input-field'
          type='text'
          placeholder='Username'
          name='username'
          // value={newProduct.product_name}
          // onChange={handleUsernameChange}
          required
        /> */}
        {/* <span>
          <input
            className='input-field'
            type='password'
            placeholder='Password'
            name='password'
            // value=""
            // onChange={handlePasswordChange}
            required
          />
          <button className='button-std'>Login</button>
        </span> */}
        <span className='mt-2'>
        <LoginButton />
        </span>
      </div>
    </div>
  );
};

export default AdminLogin;
