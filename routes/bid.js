'user strict';

// packages
var express = require('express');

// modules
var bidController = require('../controllers/bid');

var bidRouter = express.Router()
    .get('/goer/', bidController.getAllBidsByGoerId)
    .get('/order/:orderId', bidController.getAllBidsByOrderId)
    .delete('/:id', bidController.deleteById)
    .post('/', bidController.post)
    .put('/:id', bidController.put);


module.exports = bidRouter;