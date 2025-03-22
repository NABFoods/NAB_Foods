import React, { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../hooks';
import { login } from './authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginButton = () => {
    console.log("LoginButton clicked!")
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSuccess = async (response: any) => {
        try {
            const token = response.credential;
            //Send to Express to verify
            const res = await axios.post("http://localhost:3000/api/auth/google", { token }, { withCredentials: true });
            if (res.data.success) {
                dispatch(login({ email: res.data.user.email }));
                navigate('/adminHome')
             } else {
                alert("Unauthorized!");
            }
        } catch(error) {
            console.error('LoginButton - Login failed', error)
        }
    }
    
    const handleFailure = () => {
        alert("LoginButton - Google Sign-In failed")
    };

    return (
        <div className="border-1 border-slate-700 shadow-lg">
        <GoogleLogin
        onSuccess = {handleSuccess}
        onError = {handleFailure}
        />
        </div>
    )
}

export default LoginButton;