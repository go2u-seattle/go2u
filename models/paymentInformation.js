'user strict';

var mongoose = require('mongoose');

var reviewInformationCollectionName = 'reviewInformation-collection';
var reviewInformationModelName = 'ReviewInformation';

const reviewInformationSchema = new mongoose.Schema({
  reviewInformationId: {
    type: String,
    required: true
  },
  goerId: String,
  userId: String,
  orderId: String,
  message: String,
  score: Number
});

const ReviewInformation = mongoose.model(reviewInformationModelName, reviewInformationSchema, reviewInformationCollectionName);

function validatereviewInformation(reviewInformation) {
    // joi schema 
    // leave those only elemetns that client can send
    const schema = {
        reviewInformationId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        goerId: Joi.objectId().required(),
        //   userId: Joi.string().regex(/^[a-zA-Z0-9]{3,50}$/),
        userId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        orderId: Joi.string().alphanum().min(10).max(100).required(),
        message: Joi.string(),
        score: Joi.integer()
    };

    return Joi.validate(reviewInformation, schema);
}

// in order use in multiple places
exports.reviewInformationSchema = reviewInformationSchema;
exports.ReviewInformation = ReviewInformation;
exports.validatereviewInformation = validatereviewInformation;