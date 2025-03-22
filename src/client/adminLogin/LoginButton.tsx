import React, { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../hooks';
import { login } from './authSlice';
import axios from 'axios';

const LoginButton = () => {
    console.log("LoginButton clicked!")
    const dispatch = useAppDispatch();

    const handleSuccess = async (response: any) => {
        try {
            const token = response.credential;
            //Send to Express to verify
            const res = await axios.post("http://localhost:3000/api/auth/google", { token }, { withCredentials: true });
            if (res.data.success) {
                dispatch(login({ email: res.data.user.email }));
             } else {
                alert("Unauthorized!");
            }
        } catch(error) {
            console.error('LoginButton - Login failed', error)
        }
    
    const handleFailure = () => {
        alert("LoginButton - Google Sign-In failed")
    };

    return (
        <GoogleLogin
        onSuccess = {handleSuccess}
        onError = {handleFailure}
        />
    )
}
}

export default LoginButton;