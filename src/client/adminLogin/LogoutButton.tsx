import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      if (res.data.success) {
        // Redirect user to login page or home page
        window.location.href = '/adminLogin'; // Redirect to login
      } else {
        alert('Logout failed!');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout} className="button-std">
      Logout
    </button>
  );
};

export default LogoutButton;