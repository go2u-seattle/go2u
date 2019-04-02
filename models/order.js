'use strict';

// packages
var mongoose = require('mongoose');

// constants
var orderCollectionName = 'order-collection';
var orderModelName = 'orderModel';

var orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

orderSchema.methods.createSchema = function() {

};

var orderModel = mongoose.model(
    orderModelName,
    orderSchema,
    orderCollectionName
);

module.exports = orderModel