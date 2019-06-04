'use strict';

// packages
var express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
// modules
var orderController = require('../controllers/order');

var orderRouter = express.Router()
    .get('/', orderController.getAll)
    .get('/:id', auth, orderController.getById)
    .delete('/:id', [auth, admin], orderController.deleteById)
    .post('/', auth, orderController.post)
    .put('/:id', auth, orderController.put);

module.exports = orderRouter;