'use strict';

// packages
var mongoose = require('mongoose');

// constants
var orderCollectionName = 'order-collection';
var orderModelName = 'Order';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goer',
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

const Order = mongoose.model(orderModelName, orderSchema, orderCollectionName);

function validateOrder(order) {
    // joi schema 
    // leave those only elemetns that client can send
    const schema = {
        OrderId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        user: Joi.objectId().required(),
        //   userId: Joi.string().regex(/^[a-zA-Z0-9]{3,50}$/),
        goer: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        bidId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        fuilfilled: Joi.boolean()
    };

    return Joi.validate(order, schema);
}

// in order use in multiple places
exports.orderSchema = orderSchema;

exports.Order = Order;
exports.validateOrder = validateOrder;