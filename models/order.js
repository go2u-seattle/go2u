'use strict';

// packages
const Joi = require('joi');
var mongoose = require('mongoose');

// constants
var orderCollectionName = 'order-collection';
var orderModelName = 'Order';

const Order = mongoose.model(orderModelName, new mongoose.Schema({
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
}), orderCollectionName);

function validateOrder(order) {
    const schema = {
      OrderId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      userId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      goerId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      bidId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      fuilfilled: Joi.boolean()
    };
  
    return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validateOrder = validateOrder;