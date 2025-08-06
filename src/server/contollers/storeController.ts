import { Request, Response, NextFunction } from 'express';

const db = require('../models/nabModel');

export const storeController = {
  getHours: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getHoursQuery = 'SELECT opentime, closetime FROM storeinfo ';

      const result = await db.query(getHoursQuery);
      res.locals.hours = result.rows[0];
      return next();
    } catch (err) {
      console.error('Error in getHours:', err);
      next({
        log: 'Error occurred in getHours',
        status: 500,
        message: { err: 'getHours middleware failed' },
      });
    }
  },
  updateOpen: async (req: Request, res: Response, next: NextFunction) => {
    const { opentime } = req.body;
    try {
      const updateOpenQuery = 'UPDATE "storeinfo" SET opentime=$1 WHERE id = 1';
      // console.log('This is the open time:', opentime);
      const result = await db.query(updateOpenQuery, [opentime]);
      res.locals.time = opentime;
      return next();
    } catch (err) {
      console.error('Error in updateOpen:', err);
      next({
        log: 'Error occurred in updateOpen',
        status: 500,
        message: { err: 'updateOpen middleware failed' },
      });
    }
  },
  updateClose: async (req: Request, res: Response, next: NextFunction) => {
    const { closetime } = req.body;
    try {
      const updateOpenQuery =
        'UPDATE "storeinfo" SET closetime=$1 WHERE id = 1';

      const result = await db.query(updateOpenQuery, [closetime]);
      res.locals.time = closetime;
      return next();
    } catch (err) {
      console.error('Error in updateOpen:', err);
      next({
        log: 'Error occurred in updateOpen',
        status: 500,
        message: { err: 'updateOpen middleware failed' },
      });
    }
  },
};
