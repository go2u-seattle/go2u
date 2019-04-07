'use strict';

// packages
var mongoose = require('mongoose');

// constants
var bidCollectionName = 'bid-collection';
var bidModelName = 'bidModel';
var bidExpirationTimeInMilliSeconds = 600000; // 10 minutes in milli seconds.
var bidDefaultAmountInCents = 0;

var bidSchema = mongoose.Schema({
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
});

var bidModel = mongoose.model(
    bidModelName,
    bidSchema,
    bidCollectionName
);

module.exports = bidModel;