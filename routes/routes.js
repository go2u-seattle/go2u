'user strict';

// packages
var express = require('express');

// modules
var orderRoutes = require('./order');
var userRoutes = require('./user');
var goerRoutes = require('./goer');
var bidRoutes = require('./bid');
var messageRoutes = require('./message');
var paymentInformationRoutes = require('./paymentInformation');
var paymentRecordRoutes = require('./paymentRecord');
var reviewRoutes = require('./review');
var authRoutes = require('./auth');
// set router
var router = express.Router()
    .use('/order', orderRoutes)
    .use('/user', userRoutes)
    .use('/goer', goerRoutes)
    .use('/bid', bidRoutes)
    .use('/message', messageRoutes)
    .use('/paymentInformation', paymentInformationRoutes)
    .use('/paymentRecord', paymentRecordRoutes)
    .use('/review', reviewRoutes)  
    .use('/auth', authRoutes);
    
module.exports = router;