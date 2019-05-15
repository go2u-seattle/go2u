'use strict';

// packages
var express = require('express');

// modules
var goerController = require('../controllers/goer');

var goerRouter = express.Router()
    .get('/', goerController.getAll)
    .get('/:id', goerController.getById) // goerId or userId?
    .delete('/:id', goerController.deleteById)
    .post('/', goerController.post)
    .put('/:id', goerController.put);

module.exports = goerRouter;