'use strict';

// packages
var mongoose = require('mongoose');

// constants
var orderCollectionName = 'order-collection';
var orderModelName = 'orderModel';

var orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    goerId: {
        type: String,
        required: false,
        default: null
    },
    bidId: {
        type: String,
        required: false,
        default: null
    },
    fulfilled: {
        type: Boolean,
        required: true,
        default: false
    }
});

var orderModel = mongoose.model(
    orderModelName,
    orderSchema,
    orderCollectionName
);

module.exports = orderModel;