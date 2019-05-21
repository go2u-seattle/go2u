'user strict';

// packages
var express = require('express');

// modules
var paymentRecordController = require('../controllers/paymentRecord');

var paymentRecordRouter = express.Router()
    // .get('/goer/:goerid', paymentRecordController)


module.exports = paymentRecordRouter;