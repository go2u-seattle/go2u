'use strict';

// packages
var mongoose = require('mongoose');
const Joi = require('joi');

// constants
var bidCollectionName = 'bid-collection';
var bidModelName = 'Bid';
var bidExpirationTimeInMilliSeconds = 600000; // 10 minutes in milli seconds.
var bidDefaultAmountInCents = 0;

const Bid = mongoose.model(bidModelName, new mongoose.Schema({
    _id: { 
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
    createdDate: {
        type: Date,
        default: Date.now,
        expires: bidExpirationTimeInMilliSeconds
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    isAvailable: { // ttl becomes false
        type: Boolean,  
    }
}), bidCollectionName);

function validateBid(bid) {
    const schema = {
      _id: Joi.string(),
      orderId: Joi.string(),
      goerId: Joi.string(),
      amountInCents: Joi.number().min(0).max(100).required(),
      createdDate: Joi.date(), //.format('YYYY-MM-DD').options({ convert: false}),
      isConfirmed: Joi.boolean(),
      isAvailable: Joi.boolean()
    };
    return Joi.validate(bid, schema);
}

exports.Bid = Bid;
exports.validate = validateBid;