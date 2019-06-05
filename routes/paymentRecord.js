'user strict';

// packages
var express = require('express');
const auth = require('../middleware/auth');

// modules
var paymentRecordController = require('../controllers/paymentRecord');

var paymentRecordRouter = express.Router()
    // .get('/goer/:goerid', auth, paymentRecordController)


module.exports = paymentRecordRouter;