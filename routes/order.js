'user strict';

// packages
var express = require('express');

// modules
var orderController = require('../controllers/order');

var orderRouter = express.Router()
    .get('/', orderController.getAll);

module.exports = orderRouter;