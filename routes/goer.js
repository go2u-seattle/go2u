'use strict';

// packages
var express = require('express');

// modules
var goerController = require('../controllers/goer');

var goerRouter = express.Router()
    .get('/', goerController.getAll);

module.exports = goerRouter;