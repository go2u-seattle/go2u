'use strict';

// modules
const { Review, reviewSchema, validate } = require('./../models/review');
const { User } = require('./../models/user');
const { Goer } = require('./../models/goer');
const { Order } = require('./../models/order');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

/*
  Todo:
    private function that handles userId and goerID so that
    REST API calls doesn't 
*/

exports.getAll = async function (req, res) {
  const reviews = await Review.find();//.populate('goerId').populate('orderId');
  if (!reviews) return res.status(404).send('No Reviews Found');
  res.send(reviews);
};


exports.getById = async function (req, res) {
  const review = await Review.findOne(req.params.id);
  // const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).send('The Review with the given ID Not Found');
  res.send(review);

};

exports.deleteById = async function (req, res) {
  const review = await Review.findOneAndRemove(req.params.id);
  if (!review) return res.status(404).send('The Review with the given ID Not Found');
  res.send(review);
};

exports.put = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var review = await Review.findOne(req.params.id);
  if (!review) return res.status(404).send('Reivew with the given ID not found');

  // only update fields that were actually passed...
  if (req.body.message !== null ) {
    review.message = req.body.message;
  }
  if (req.body.score !== null ) {
    review.score = req.body.score;
  }
  await review.save();
  res.send(review);
};



exports.post = async function (req, res) {
  // validate 
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("Review Shcema Validation done");

  // validate whoever wants to write a review.
  const goer = await Goer.findOne({ _id: req.body.goerId });
  if (!goer) return res.status(404).send('Goer with the given ID Not Found');
  console.log("Goer Validation done");

  const order = await Order.findOne({ _id: req.body.orderId });
  if (!order) return res.status(404).send('Order with the given ID Not Found');
  console.log("Order Validation done");

  // if (checkDuplicate(order._id)) {
  //   return res.status(404).send("Review for this order already created.");
  // }

  var review = await Review.findOne({ goerId: goer._id });
  if (review) {
    return res.status(404).send("Review for this order already created.");
  }

  review = new Review({
    _id: uuidv1(),
    goerId: goer._id,
    orderId: order._id,
    message: req.body.message,
    score: req.body.score
  });
  await review.save();
  res.send(review);
};


function checkDuplicate(orderId) {
  let review = Review.findOne({ orderId: orderId });
  console.log(review);
  if (review) {
    return true;
  }
  return false;
}
