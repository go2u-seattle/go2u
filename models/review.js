'user strict';

var mongoose = require('mongoose');
const Joi = require('joi');

var reviewCollectionName = 'review-collection';
var reviewModelName = 'Review';

const reviewSchema = new mongoose.Schema({
  _id: String,
  goerId: {
    type: String,
    ref: 'Goer'
  },
  userId: {
    type: String,
    ref: 'User'
  },
  orderId: {
    type: String,
    ref: "Order"
  },
  message: String,
  score: Number
});

const Review = mongoose.model(reviewModelName, reviewSchema, reviewCollectionName);


function validateReview(review) {
  const schema = {
    _id: Joi.string(),
    goerId: Joi.string(),
    userId: Joi.string(),
    orderId: Joi.string().required(),
    message: Joi.string(),
    score: Joi.number()
  };
  return Joi.validate(review, schema);
}

// in order use in multiple places
exports.reviewSchema = reviewSchema;
exports.Review = Review;
exports.validate = validateReview;




