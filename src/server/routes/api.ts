import express from 'express';
// const menuController = require('../contollers/menuController')
import { menuController } from '../contollers/menuController';
import { orderController } from '../contollers/orderController';
import { authController } from '../contollers/authController';

const router = express.Router();

// Route for admin login using Google
router.post('/auth/google', authController.googleLogin);

router.post('auth/logout', authController.logout);

router.get('/getOrders', orderController.getOrders, (req, res) => {
  res.status(200).json({
    orders:res.locals.orders,
  })
})
router.post('/createCheckout', orderController.createCheckout, (req, res) => {
  res.json({ id: res.locals.paymentSession });
});
router.get('/', menuController.getMenuItems, (req, res) => {
  // console.log(
  //   'api.ts - made it back to router.get w/ res.locals.menu = ',
  //   res.locals.menu
  // );
  res.status(200).json({
    menu: res.locals.menu,
  });
});

router.post('/', menuController.addMenuItem, (req, res) => {
  res.status(200).json({
    menu: res.locals.addedItem,
  });
});

router.patch('/:id/sold-out', menuController.toggleSoldOut, (req, res) => {
  console.log("api router.patch for sold_out - got response back to route handler. res.locals = ", res.locals)
  res.status(200).json({ menu: res.locals.updatedMenuItemSoldOut })
})

router.patch('/update-product/:id', menuController.updateProduct, (req, res) => {
  console.log("api router.patch - updating product field. res.locals = ", res.locals);
  res.status(200).json({ updatedProduct: res.locals.updatedProduct });
});

router.put('/', menuController.updateMenuItem, (req, res) => {
  res.status(200).json({
    menu: res.locals.updatedMenuItem,
  });
});

router.delete('/:id', menuController.deleteMenuItem, (req, res) => {
  console.log("api.ts - made it to router.delete response w/ status 200")
  res.status(200).json({
    menu: res.locals.deletedMenuItem,
  });
});

module.exports = router;
