import { Request, Response, NextFunction } from 'express';
import { Product } from '../../types';
const db = require('../models/nabModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const orderController = {
  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, phone } = req.body;
    try {
      const insertCustomerInfo =
        'INSERT into customer (address, phone, name) VALUES ($1, $2, $3) RETURNING *';

      const result = await db.query(insertCustomerInfo, [address, phone, name]);
      res.locals.customerInfo = result.rows[0];
      console.log('result.rows[0] = ', result.rows[0]);
      next();
    } catch (err) {
      console.error('Error in getOrders:', err);
      next({
        log: 'Error occurred in getOrders',
      });
    }
    console.log('THIS IS CUSTOMER INFO', name, address, phone);

    return next();
  },
  createCheckout: async (req: Request, res: Response, next: NextFunction) => {
    const { products, quantity, defaultImage } = req.body;
    if (!req.body || !products || quantity === 0) {
      return next();
    }
    const filteredProducts = (Object.values(products) as Product[]).filter(
      (product: Product) => product.quantity != null
    );
    console.log(defaultImage);
    const lineItems = filteredProducts.map((product: any) => ({
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.product_name,
          images: [`${product.img_url ? product.img_url : defaultImage}`],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: Number(product.quantity[0]),
    }));
    //console.log(JSON.stringify(lineItems, null, 2));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url:
        'https://www.google.com/search?sca_esv=8528ae50a243c1b7&rlz=1C5CHFA_enUS1122US1122&sxsrf=AHTn8zqzV9A4L8rxQBGOyQr-XGzqx9T4cg:1742351367945&q=success&spell=1&sa=X&ved=2ahUKEwiu0PDSjJWMAxUTg4kEHVpiLYEQBSgAegQIDhAB&biw=724&bih=758&dpr=2',
      cancel_url:
        'https://www.google.com/search?q=failure&rlz=1C5CHFA_enUS1122US1122&oq=fail&gs_lcrp=EgZjaHJvbWUqDwgAEAAYQxixAxiABBiKBTIPCAAQABhDGLEDGIAEGIoFMhYIARBFGDkYQxhGGPkBGLEDGIAEGIoFMg8IAhAAGEMYsQMYgAQYigUyDAgDEAAYQxiABBiKBTIMCAQQABhDGIAEGIoFMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMjY1N2owajmoAgCwAgDxBUIWTnLj_i4N&sourceid=chrome&ie=UTF-8',
    });

    res.locals.paymentSession = session.id;
    return next();
  },
  getOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getOrdersQuery = `
        SELECT 
          "order".id AS order_id, 
          "order".order_date, 
          "order".order_status, 
          "order".order_price, 
          "order".pickup,
          customer.id AS customer_id, 
          customer.name AS customer_name, 
          customer.address, 
          customer.phone,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'product_id', product.id,
              'product_name', product.product_name,
              'price', product.price,
              'quantity', order_product.product_quantity,
              'subtotal', order_product.product_subtotal
            )
          ) AS products
        FROM "order"
        JOIN customer ON "order".customer_id = customer.id
        JOIN order_product ON "order".id = order_product.order_id
        JOIN product ON order_product.product_id = product.id
        GROUP BY "order".id, customer.id;
      `;

      console.log('Executing Query:', getOrdersQuery);
      const orderResults = await db.query(getOrdersQuery);
      console.log('Query Results:', orderResults.rows);

      res.locals.orders = orderResults.rows;
      next();
    } catch (err) {
      console.error('Error in getOrders:', err);
      next({
        log: 'Error occurred in getOrders',
      });
    }
  },
};
