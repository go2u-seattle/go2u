'use strict';

// packages
var express = require('express');
const auth = require('../middleware/auth');

// modules
var goerController = require('../controllers/goer');

var goerRouter = express.Router()
    .get('/', goerController.getAll)
    .get('/:id', auth, goerController.getById) // goerId or userId?
    .delete('/:id', auth, goerController.deleteById)
    .post('/', goerController.post)
    .put('/:id', auth, goerController.put);

module.exports = goerRouter;