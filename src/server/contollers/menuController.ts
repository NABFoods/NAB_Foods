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
      console.log('menuItems- heading into res locals!!', menuItems.rows);
      res.locals.menu = menuItems;
      next();
    } catch (err) {
      next({
        log: 'getMenuItems',
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
};
