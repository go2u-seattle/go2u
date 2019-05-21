'user strict';

// packages
var express = require('express');

// modules
var reviewController = require('../controllers/review');

var reviewRouter = express.Router()
    // .get('/goer/:goerid', reviewController)


module.exports = reviewRouter;