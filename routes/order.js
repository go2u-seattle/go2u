'use strict';

// packages
var express = require('express');

// modules
var orderController = require('../controllers/order');

var orderRouter = express.Router()
    .get('/', orderController.getAll)
    .get('/:id', orderController.getById)
    .delete('/:id', orderController.deleteById)
    .post('/', orderController.post)
    .put('/:id', orderController.put);

module.exports = orderRouter;