// Component corresponding to order_products table tracking products added to cart

import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks"  // typed versions of userSelector & useDispatch from hooks.ts

export function Cart() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const items = useAppSelector((state) => state.cart.items);

    // for getting total price
    // const totalPrice = useAppSelector(getTotalPrice); 
    // Use to know if customer has ordered....??
    // const checkoutState = useAppSelector((state) => state.cart.checkoutState);

    return (
        <main className="page">
        <h1>Order Items from NAB Foods</h1>
        <ul>
            {Object.entries(items).map((item, idx) => (
              <div key={idx}>
                <li>Product: {item[0]} </li>
                <li>Quantity : {item[1]} </li>
              </div>
            ))}
            </ul>
            <li>Total</li>

      </main>
    );
}  

export default Cart;
