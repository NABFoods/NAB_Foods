import React, { FC } from 'react';
import { useAppSelector } from '../../hooks';

const AdminFoodCard: FC = () => {
  //use typed useSelector from hooks.ts to pull products from store
  const products = useAppSelector((state) => state.products.products);

  return (
    <div>
      <h2>Admin Products View</h2>
      <div>
        {Object.values(products).map((product) => (
          <div key={product.id}>
            <h3>Name: {product.product_name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              Status: {product.sold_out ? 'Sold Out' : 'Available'}
              {!product.sold_out && <button>Mark sold out?</button>}
            </p>
            <button>Remove Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoodCard;
