'user strict';

// packages
var express = require('express');

// modules
var paymentInformationController = require('../controllers/paymentInformation');

var paymentInformationRouter = express.Router()
    // .get('/goer/:goerid', paymentInformationController)


module.exports = paymentInformationRouter;