const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const isAuthUser = require('../middleware/is-auth-user');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products/:productId', shopController.getProduct);

router.get('/orders',isAuthUser, shopController.getOrders);

router.post('/orders',isAuthUser, shopController.postOrder);

module.exports = router;