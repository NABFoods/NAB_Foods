import express from 'express';
// const menuController = require('../contollers/menuController')
import { menuController } from '../contollers/menuController';

const router = express.Router();

router.get('/', menuController.getMenuItems, (req, res) => {
  console.log("api.ts - made it back to router.get w/ res.locals.menu = ", res.locals.menu)
  res.status(200).json({
    menu: res.locals.menu,
  });
});

router.post('/', menuController.addMenuItem, (req, res) => {
  res.status(200).json({
    menu: res.locals.addedItem,
  });
});

router.put('/', menuController.updateMenuItem, (req, res) => {
  res.status(200).json({
    menu: res.locals.updatedMenuItem,
  }); 
});

router.delete('/:id', menuController.deleteMenuItem, (req, res) => {
  console.log("api.ts - made it to router.delete response w/ status 200 & res.locals.deleteMenuItem = ", res.locals.deleteMenuItem)
  res.status(200).json({
    menu: res.locals.deletedMenuItem,
  });
});

module.exports = router;
