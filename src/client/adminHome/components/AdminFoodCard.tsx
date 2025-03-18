import React, { FC, useEffect } from 'react';

const AdminFoodCard: FC = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.menu);
      });
  }, []);

  return <div>Admin Food Card</div>

};

export default AdminFoodCard;
