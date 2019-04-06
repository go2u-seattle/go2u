'user strict';

// packages
var express = require('express');

// modules
var orderRoutes = require('./order');
var userRoutes = require('./user');
var goerRoutes = require('./goer');
var bidRoutes = require('./bid');

// set router
var router = express.Router()
    .use('/order', orderRoutes)
    .use('/user', userRoutes)
    .use('/goer', goerRoutes)
    .use('/bid', bidRoutes);

module.exports = router;