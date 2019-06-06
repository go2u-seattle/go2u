'use strict';

// packages
var express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


// modules
var userController = require('../controllers/user');

var userRouter = express.Router()
    .get('/', userController.getAll)
    .get('/:id', userController.getByUserId)
    .delete('/:id', [auth, admin], userController.deleteByUserId)
    .post('/', userController.post)
    .put('/:id', auth, userController.put);

module.exports = userRouter;