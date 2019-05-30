'user strict';

// packages
var express = require('express');

// modules
var reviewController = require('../controllers/review');

var reviewRouter = express.Router()
  .post('/goer', reviewController.post)
  .get('/goer', reviewController.getAll)
  .get('/goer/:goerid', reviewController.getById)
  .delete('/goer/:goerid', reviewController.deleteById)
  .put('/goer/:goerid', reviewController.put)

  .post('/user', reviewController.post)
  .get('/user', reviewController.getAll)
  .get('/user/:userid', reviewController.getById)
  .delete('/user/:userid', reviewController.deleteById)
  .put('/user/:userid', reviewController.put);

module.exports = reviewRouter;