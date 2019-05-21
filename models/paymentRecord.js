'user strict';

var mongoose = require('mongoose');

var reviewRecordCollectionName = 'reviewRecord-collection';
var reviewRecordModelName = 'ReviewRecord';

const reviewRecordSchema = new mongoose.Schema({
  orderId: String,
  goerId: String,
  total: Number,
  profit: Number,
  fee: Number,
  tip: Number,
  processed: {
    type: Boolean,
    default: False
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
});

const ReviewRecord = mongoose.model(reviewRecordModelName, reviewRecordSchema, reviewRecordCollectionName);

function validateReviewRecord(reviewRecord) {
    // joi schema 
    // leave those only elemetns that client can send
  const schema = {
    orderId: Joi.String(),
    orderId: Joi.String(),
    goerId: Joi.String(),
    profit: Joi.integer(),
    fee: Joi.integer(),
    tip: Joi.integer()
  };

  return Joi.validate(reviewRecord, schema);
}

// in order use in multiple places
exports.reviewRecordSchema = reviewRecordSchema;
exports.ReviewRecord = ReviewRecord;
exports.validateReviewRecord = validateReviewRecord;