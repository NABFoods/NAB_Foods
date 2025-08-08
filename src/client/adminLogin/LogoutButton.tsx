import React from 'react';
import axios from 'axios';
const host = process.env.REACT_APP_API_BASE_URL;
const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${host}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        // Redirect user to login page or home page
        localStorage.removeItem('authInfo');
        window.location.href = '/adminLogin'; // Redirect to login
      } else {
        alert('Logout failed!');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout} className='button-std'>
      Logout
    </button>
  );
};

export default LogoutButton;
