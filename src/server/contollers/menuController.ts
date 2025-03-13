import { menu, } from "../../types";
import { Request, Response, NextFunction } from 'express';

const db = require('../models/nabModel');

export const menuController: menu = {
        getMenuItems: async(req: Request, res: Response, next:NextFunction) => {
        try {
            const getMenuItemsString = 'SELECT * FROM product'
            console.log("QUERIED", getMenuItemsString)
            const menuResults = await db.query(getMenuItemsString);
            console.log("QUERIED MENU RESULTS", menuResults)
            const menuItems = menuResults.rows;
            console.log("menuItems- heading into res locals!!", menuItems.rows)
            res.locals.menu = menuItems
            next();
        } catch (err) {
            next({
                log:'getMenuItems'
            })
        }
    },

    addMenuItem: async(req: Request, res: Response, next:NextFunction) => {
        try{
            const addMenuItemsString = 'INSERT into product '
            console.log("NOT YET FINISHED HERE")
            next();
        } catch(err) {
            next({
                log: 'addMenuItems'
            })
        }

    }
}

