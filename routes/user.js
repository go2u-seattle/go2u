'use strict';

// packages
var express = require('express');

// modules
var userController = require('../controllers/user');

var userRouter = express.Router()
    .get('/', userController.getAll)
    .get('/:id', userController.getByUserId)
    .delete('/:id', userController.deleteByUserId)
    .post('/', userController.post)
    .put('/:id', userController.put);

module.exports = userRouter;