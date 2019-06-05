'use strict';

// packages
var express = require('express');

// modules
var authController = require('../controllers/auth');

var authRouter = express.Router()
  .post('/', authController.post);

module.exports = authRouter;