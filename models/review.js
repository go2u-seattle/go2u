'user strict';

var mongoose = require('mongoose');

var reviewCollectionName = 'review-collection';
var reviewModelName = 'Review';

const reviewSchema = new mongoose.Schema({
  reviewId: String,
  goerId: String,
  userId: String,
  orderId: String,
  message: String,
  Score: Number
});

const Review = mongoose.model(reviewModelName, reviewSchema, reviewCollectionName);

function validateReview(review) {
    // joi schema 
    // leave those only elemetns that client can send
  const schema = {
    reviewId: Joi.String(),
    goerId: Joi.String(),
    userId: Joi.String(),
    orderId: Joi.String(),
    message: Joi.String(),
    Score: Joi.integer()
  };

  return Joi.validate(review, schema);
}

// in order use in multiple places
exports.reviewSchema = reviewSchema;
exports.Review = Review;
exports.validateReview = validateReview;




