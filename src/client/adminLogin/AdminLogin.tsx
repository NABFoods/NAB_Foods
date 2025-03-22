import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

const AdminLogin: FC = () => {


  
  return (
    <div className='flex flex-col justify-start items-start px-4 py-4 min-h-screen bg-gray-100'>
      <div className=' max-w-80'>
        <input
          className='input-field'
          type='text'
          placeholder='Username'
          name='username'
          // value={newProduct.product_name}
          // onChange={handleUsernameChange}
          required
        />
        <span>
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
        </span>
      </div>
    </div>
  );
};

export default AdminLogin;
