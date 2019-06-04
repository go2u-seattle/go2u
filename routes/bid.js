'user strict';

// packages
var express = require('express');
const auth = require('../middleware/auth');

// modules
var bidController = require('../controllers/bid');

var bidRouter = express.Router()
    .get('/goer/', auth, bidController.getAllBidsByGoerId)
    .get('/order/:orderId', auth, bidController.getAllBidsByOrderId)
    .delete('/:goerId', auth, bidController.deleteById)
    .post('/', auth, bidController.post)
    .put('/:id', auth, bidController.put);


module.exports = bidRouter;