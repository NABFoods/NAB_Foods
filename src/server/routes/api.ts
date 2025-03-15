import express from 'express';
// const menuController = require('../contollers/menuController')
import { menuController } from '../contollers/menuController';

const router = express.Router();

router.get('/', menuController.getMenuItems, (req, res) => {
  res.status(200).json({
    menu: res.locals.menu,
  });
});

router.post('/', menuController.addMenuItem, (req, res) => {
  res.status(200).json({
    menu: res.locals.addedItem,
  });
});

module.exports = router;
