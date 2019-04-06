'user strict';

// packages
var express = require('express');

// modules
var bidController = require('../controllers/bid');

var bidRouter = express.Router()
    .get('/goer/:goerid', bidController.getAllBidsByGoerId)
    .get('/order/:orderId', bidController.getAllBidsByOrderId);

module.exports = bidRouter;