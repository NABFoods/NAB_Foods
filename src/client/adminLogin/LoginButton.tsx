import React, { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../hooks';
import { login } from './authSlice';
import axios from 'axios';
const host = process.env.REACT_APP_API_BASE_URL;
const LoginButton = () => {
  const dispatch = useAppDispatch();
  // const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;  // For React

  const handleSuccess = async (response: any) => {
    try {
      const token = response.credential;
      //Send to Express to verify
      const res = await axios.post(
        `${host}/api/auth/google`,
        { token },
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.setItem('authInfo', JSON.stringify(res.data));
        dispatch(login({ email: res.data.user.email }));
        window.location.href = '/adminHome';
      } else {
        alert('Unauthorized!');
      }
    } catch (error) {
      console.error('LoginButton - Login failed', error);
    }
  };

  const handleFailure = () => {
    alert('LoginButton - Google Sign-In failed');
  };

  return (
    <div className='border-1 border-slate-700 shadow-lg'>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default LoginButton;
