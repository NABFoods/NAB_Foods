import express from 'express';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
// const menuController = require('../contollers/menuController')
import { menuController } from '../contollers/menuController';
import { orderController } from '../contollers/orderController';
import { authController } from '../contollers/authController';
import { smsController } from '../contollers/smsController';
import { storeController } from '../contollers/storeController';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!);

//routes for image uploads
router.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  // console.log('SUPABASE URL:', SUPABASE_URL);
  // console.log('Received file:', file);
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileExt = file.originalname.split('.').pop();
  const filename = `${Date.now()}.${fileExt}`;
  const bucketName = 'food-images';

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }

  const { data: signedURLData, error: signedUrlError } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(filename, 7889400);

  if (signedUrlError) {
    console.error(signedUrlError);
    return res.status(500).json({ error: 'Failed to generate signed URL' });
  }
  return res.json({ imageUrl: signedURLData.signedUrl, filename: filename });
});

router.delete('/deleteImage', async (req, res) => {
  // console.log('this is the filename', req.body.filename);

  const { data, error } = await supabase.storage
    .from('food-images')
    .remove([req.body.filename]);

  if (error) {
    console.error('Error deleting image:', error);
  }

  if (data) {
    return res.status(200).json({ message: 'Image deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Image not found' });
  }
});

// Route for admin login using Google
router.post('/auth/google', authController.googleLogin);

router.post('/createMessage', smsController.createMessage, (req, res) => {
  res.status(200).json({ message: res.locals.message });
});

router.patch('/updateOpen', storeController.updateOpen, (req, res) => {
  res.status(200).json({ time: res.locals.time });
});

router.patch('/updateClose', storeController.updateClose, (req, res) => {
  res.status(200).json({ time: res.locals.time });
});
router.get('/secureStripe', orderController.secureStripe, (req, res) => {
  res.status(200).json({ stripe: res.locals.stripe });
});
router.get('/getHours', storeController.getHours, (req, res) => {
  res.status(200).json({ time: res.locals.hours });
});
router.post('/sms', smsController.smsResponse, (req, res) => {
  res.status(200).send('SMS response sent');
});
router.post('/auth/logout', authController.logout);

router.get('/getOrders', orderController.getOrders, (req, res) => {
  res.status(200).json({
    orders: res.locals.orders,
  });
});
router.post('/createCheckout', orderController.createCheckout, (req, res) => {
  res.json({ id: res.locals.paymentSession });
});
router.post('/createOrder', orderController.createOrder, (req, res) => {
  res.status(200).json(res.locals.order);
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
  // console.log(
  //   'api router.patch for sold_out - got response back to route handler. res.locals = ',
  //   res.locals
  // );
  res.status(200).json({ menu: res.locals.updatedMenuItemSoldOut });
});

router.patch(
  '/:id/order-status',
  orderController.updateOrderStatus,
  (req, res) => {
    // console.log(
    //   'api router.patch for order_status - got response back to route handler. res.locals = ',
    //   res.locals
    // );
    res.status(200).json({ order: res.locals.updatedOrderStatus });
  }
);

router.patch(
  '/update-product/:id',
  menuController.updateProduct,
  (req, res) => {
    // console.log(
    //   'api router.patch - updating product field. res.locals = ',
    //   res.locals
    // );
    res.status(200).json({ updatedProduct: res.locals.updatedProduct });
  }
);

// router.put('/', menuController.updateMenuItem, (req, res) => {
//   res.status(200).json({
//     menu: res.locals.updatedMenuItem,
//   });
// });

router.delete('/:id', menuController.deleteMenuItem, (req, res) => {
  // console.log('api.ts - made it to router.delete response w/ status 200');
  res.status(200).json({
    menu: res.locals.deletedMenuItem,
  });
});

router.delete('/:id/deleteOrder', orderController.deleteOrder, (req, res) => {
  // console.log('api.ts - made it to router.delete response w/ status 200');
  res.status(200).json({
    menu: res.locals.deletedOrder,
  });
});
module.exports = router;
