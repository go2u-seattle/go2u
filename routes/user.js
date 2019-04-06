'use strict';

// packages
var express = require('express');

// modules
var userController = require('../controllers/user');

var userRouter = express.Router()
    .get('/', userController.getAll);

module.exports = userRouter;