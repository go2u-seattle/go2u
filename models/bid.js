'use strict';

// packages
var mongoose = require('mongoose');

// constants
var bidCollectionName = 'bid-collection';
var bidModelName = 'bidModel';
var bidExpirationTimeInMilliSeconds = 600000; // 10 minutes in milli seconds.
var bidDefaultAmountInCents = 0;

const Bid = mongoose.model(bidModelName, new mongoose.Schema({
    bidId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    goerId: {
        type: String,
        required: true
    },
    amountInCents: {
        type: Number,
        required: true,
        default: bidDefaultAmountInCents
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: bidExpirationTimeInMilliSeconds
    }
}), bidCollectionName);

function validateBid(bid) {
    // Joi schema
    const schema = {
      bidId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      orderId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      goerId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      amountInCents: Joi.number().double().min(0).max(100).required(),
      expiresAt: Joi.date().format('YYYY-MM-DD').options({ convert: false})
    };
  
    return Joi.validate(bid, schema);
}

exports.Bid = Bid;
exports.validateBid = validateBid;