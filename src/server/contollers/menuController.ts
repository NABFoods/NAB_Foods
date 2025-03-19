import { menu } from '../../types';
import { Request, Response, NextFunction } from 'express';

const db = require('../models/nabModel');

export const menuController: menu = {
  getMenuItems: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getMenuItemsString = 'SELECT * FROM product';
      console.log('QUERIED', getMenuItemsString);
      const menuResults = await db.query(getMenuItemsString);
      console.log('QUERIED MENU RESULTS', menuResults);
      const menuItems = menuResults.rows;
      console.log('menuItems- heading into res locals!!', menuItems);
      res.locals.menu = menuItems;
      next();
    } catch (err) {
      console.error("console.error in getMenuItems -", err)
      next({
        log: 'Error in getMenuItems',
      });
    }
  },

  addMenuItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //pull all of the variables from the request body
      const {
        product_name,
        price,
        sold_out,
      }: { product_name: string; price: number; sold_out: boolean } = req.body;

      //create a query that inserts into the product table with all of those values
      const addMenuItemsString =
        'INSERT into product (product_name, price, sold_out) VALUES ($1,$2,$3)';

      //return the newest value

      const result = await db.query(addMenuItemsString, [
        product_name,
        price,
        sold_out,
      ]);
      //console.log('RESULT ROWS', result.rows);
      res.locals.addedItem = result.rows;
      next();
    } catch (err) {
      next({
        log: 'addMenuItems',
      });
    }
  },

  updateMenuItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        id,
        product_name,
        price,
        sold_out,
      }: {
        id: number;
        product_name: string;
        price: number;
        sold_out: boolean;
      } = req.body;
      const updateMenuItemsString = `UPDATE product SET product_name = '${product_name}', price = ${price}, sold_out = ${sold_out} WHERE id=${id}`;

      const result = await db.query(updateMenuItemsString);
      console.log('RESULT: ', result);
      res.locals.updatedMenuItem = result.rows;
      next();

      /**
       * Example request body: 
       *    {
                "id":1,
                "product_name": "baNAYNAY",
                "price": 50,
                "sold_out":true
            }
       */
    } catch (err) {
      next({
        log: 'updateMenuItems',
      });
    }
  },
  deleteMenuItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id }: { id: number } = req.body;

      const deleteMenuItemString = `DELETE FROM product WHERE id=${id}`;
      const result = await db.query(deleteMenuItemString);

      console.log(result);
      res.locals.deletedMenuItem = result.rows;
    } catch (err) {
      next({
        log: 'deleteMenuItems',
      });
    }
    /**
       * Example request body: 
       *    {
            "id":16
            }
       */
  },
};
