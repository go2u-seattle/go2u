'user strict';

// packages
var express = require('express');

// modules
var orderRoutes = require('./order');

var router = express.Router()
    .use('/order', orderRoutes);

module.exports = router;