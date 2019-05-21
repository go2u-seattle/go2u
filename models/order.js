'use strict';

// packages
var mongoose = require('mongoose');
const Joi = require('joi');
// constants
var orderCollectionName = 'order-collection';
var orderModelName = 'Order';

var DeliveryEnum = {
    
}

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
    // goer: { // need more clarification
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Goer',
    //     required: false,
    //     default: null
    // },
    // bidId: {
    //     type: String,
    //     required: false,
    //     default: null
    // },
    origin: {
        address: {

        },
        contact_Info: {

        },
        isPickedUp: Boolean,
        pickedUpTime: {
            type: Date
        }
    },
    Destination: {
        address: {

        },
        contact_Info: {

        },
        isDroppedOff: Boolean,
        droppedOffTime: {
            type: Date
        },
        confirmationImage: {
            type: String // url
        },
        receivedIdConfirmed: {
            type: Boolean
        }
    },
    item: {
        itemName: String,
        itemDescription: String,
        image: String,
        itemSize: String // enum S/M/L
    },
    orderDescription: String, 
    preferredDeliveryMethodType: DeliveryEnum ,// walker/public, sedan, truck (by size)
    // Date objects
    orderCreationTime: Date,
    orderPlacedTime: Date,
    expirationDate: Date,

    isConfirmed: Boolean,
    paymentRecordId: String
});

const Order = mongoose.model(orderModelName, orderSchema, orderCollectionName);

function validateOrder(order) {
    // joi schema 
    // leave those only elemetns that client can send
    const schema = {
        OrderId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        // user: Joi.objectId().required(),
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