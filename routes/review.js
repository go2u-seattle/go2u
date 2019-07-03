'user strict';

// packages
var express = require('express');
const auth = require('../middleware/auth');

// modules
var reviewController = require('../controllers/review');

var reviewRouter = express.Router()
  .post('/goer', reviewController.post)
  .get('/goer', reviewController.getAll)
  .get('/goer/:goerid', auth, reviewController.getById)
  .delete('/goer/:goerid', auth, reviewController.deleteById)
  .put('/goer/:goerid', auth, reviewController.put)

  .post('/user', reviewController.post)
  .get('/user', reviewController.getAll)
  .get('/user/:userid', auth, reviewController.getById)
  .delete('/user/:userid', auth, reviewController.deleteById)
  .put('/user/:userid', auth, reviewController.put);

module.exports = reviewRouter;