import { Request, Response, NextFunction } from 'express';
import { Product } from '../../types';
const db = require('../models/nabModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const orderController = {
  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      address,
      phone,
      order_date,
      order_status,
      order_price,
      products,
    } = req.body;
    console.log('Request body:', req.body);
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Products must be an array' });
    }
    try {
      // Step 1: Insert customer info (if needed)
      const insertCustomerInfo =
        'INSERT INTO customer (address, phone, name) VALUES ($1, $2, $3) RETURNING id';
      const customerResult = await db.query(insertCustomerInfo, [
        address,
        phone,
        name,
      ]);
      const customerId = customerResult.rows[0].id; // Get the customer ID from the inserted row

      // Step 2: Insert order info and link it to the customer
      const insertOrderQuery =
        'INSERT INTO "order" (order_date, order_status, order_price, customer_id) VALUES ($1, $2, $3, $4) RETURNING id';
      const orderResult = await db.query(insertOrderQuery, [
        order_date,
        order_status,
        order_price,
        customerId,
      ]);

      const orderId = orderResult.rows[0].id; // Get the new order ID
      console.log('This is order Price', order_price);
      // Step 3: Insert the products associated with this order into the order_product table
      for (const product of products) {
        const { product_id, product_quantity, product_subtotal } = product;
        // console.log('THIS IS PRODUCT ID,', product_id);
        const insertProductQuery =
          'INSERT INTO order_product (order_id, product_id, product_quantity, product_subtotal) VALUES ($1, $2, $3, $4)';
        await db.query(insertProductQuery, [
          orderId,
          product_id,
          product_quantity,
          product_subtotal,
        ]);
      }

      // Step 4: Return the order information
      res.locals.order = {
        order_id: orderId,
        customer_name: name,
        order_date,
        order_status,
        order_price,
        products,
      };
      return next(); // Proceed to the next middleware
    } catch (err) {
      console.error('Error in createOrder:', err);
      next({
        log: 'Error occurred in createOrder',
      });
    }
  },

  createCheckout: async (req: Request, res: Response, next: NextFunction) => {
    // --- UPDATED: Use each product's individual quantity ---
    const { products, defaultImage, shipping } = req.body;
    if (!req.body || !products || products.length === 0) {
      return next();
    }
    //console.log('products', req.body.products);
    // Filter out sold-out products (if applicable)
    const filteredProducts = (products as Product[]).filter(
      (product: Product) => !product.sold_out
    );
    console.log('FILTERED', shipping);
    if (shipping.shippingCheck === true) {
      filteredProducts.push({
        id: 1000,
        product_name: 'shipping & Handling',
        price: shipping.shippingCost,
        sold_out: false,
        img_url: defaultImage,
        description: 'shipping and handling fee',
        type: 'Prep',
        quantity: 1,
      });
    }
    // console.log('defaultImage:', defaultImage);
    //console.log('filtered products', filteredProducts);
    // Create line items using each product's own quantity
    const lineItems = filteredProducts.map((product: any) => ({
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.product_name,
          images: [`${product.img_url ? product.img_url : defaultImage}`],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: Number(product.quantity),
    }));

    // Create the Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8081/successpage',
      cancel_url: 'http://localhost:8081/failurepage',
    });
    //console.log('SESSION  INFO', session);
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

      //console.log('Executing Query:', getOrdersQuery);
      const orderResults = await db.query(getOrdersQuery);
      //console.log('Query Results:', orderResults.rows);

      res.locals.orders = orderResults.rows;
      next();
    } catch (err) {
      console.error('Error in getOrders:', err);
      next({
        log: 'Error occurred in getOrders',
      });
    }
  },
  deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deleteQuery1 = `DELETE FROM "order_product" WHERE order_id = $1`;
      const deleteQuery2 = `DELETE FROM "order" WHERE id = $1`;
      const result = await db.query(deleteQuery1, [id]);
      const result2 = await db.query(deleteQuery2, [id]);

      if (result.rowCount === 0) {
        return next({
          log: 'orderController.deleteOrder - Product not found',
          status: 404,
          message: 'Product not found',
        });
      }

      res.locals.deletedOrder = result2.rows[0];

      return next();
    } catch (err) {
      next({
        log: 'Error in deleteOrder middleware',
        status: 500,
        message: { err: 'deleteOrder database deletion failed' },
      });
    }
  },

  updateOrderStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { order_status } = req.body;

      const updateQuery = `UPDATE "order" SET order_status = $1 WHERE id = $2 RETURNING *`;
      const result = await db.query(updateQuery, [order_status, id]);

      if (result.rowCount === 0) {
        return next({
          log: 'orderController.updateStatus - Product not found',
          status: 404,
          message: 'Product not found',
        });
      }

      res.locals.updatedOrderStatus = result.rows[0];

      return next();
    } catch (err) {
      next({
        log: 'Error in updateStatus middleware',
        status: 500,
        message: { err: 'updateStatus database update failed' },
      });
    }
  },
};
