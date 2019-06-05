'use strict';
// packages
var mongoose = require('mongoose');
const Joi = require('joi');

// constants
var orderCollectionName = 'order-collection';
var orderModelName = 'Order';

var DeliveryEnum = ["Walking", "Bike", "Motorcycle", "Car", "Truck", "Van", "Bus"];

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    origin: {
        address: {
            type: String,
            // required: true
        },
        contact_Info: {
            name: String,
            phone: {
                number: String,
                isVerified: Boolean
            },
        },
        isPickedUp: Boolean,
        pickedUpTime: {
            type: Date
        }
    },
    destination: {
        address: {
            type: String,
            // required: true
        },
        contact_Info: {
            name: String,
            phone: {
                number: String,
                isVerified: Boolean
            },
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
    preferredDeliveryMethodType: String,// walker/public, sedan, truck (by size)
    orderCreationTime: Date,
    orderPlacedTime: Date,
    orderPickedUpTime: Date,
    orderDeliveredTime: Date,
    orderState: String,
    expirationDate: Date,
    isConfirmed: Boolean,
    paymentRecordId: String
});

const Order = mongoose.model(orderModelName, orderSchema, orderCollectionName);

function validateOrder(order) {
    // joi schema 
    // leave those only elemetns that client can send
    const phoneSchema = Joi.object({
        number: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        isVerified: Joi.boolean().required()
    });

    const contactInfoSchema = Joi.object({
        name: Joi.string(),
        phone: phoneSchema
    });

    const originAddressSchema = Joi.object({
        address: Joi.string(),
        contact_Info: contactInfoSchema,
        isPickedUp: Joi.boolean(),
        pickedUpTime: Joi.date()
    });

    const destinationAddressSchema = Joi.object({
        address: Joi.string(),
        contact_Info: contactInfoSchema,
        isDroppedOff: Joi.boolean(),
        droppedOffTime: Joi.date().min('1-1-2019'),
        confirmationImage: Joi.string(),
        receivedIdConfirmed: Joi.boolean()
    });

    const itemSchema = Joi.object({
        itemName: Joi.string(),
        itemDescription: Joi.string(),
        image: Joi.string(),
        itemSize: Joi.string() // enum S/M/L
    });

    const schema = {
        _id: Joi.string(),
        userId: Joi.string(),
        origin: originAddressSchema,
        destination: destinationAddressSchema,
        item: itemSchema,
        orderDescription: Joi.string(),
        preferredDeliveryMethodType: Joi.string(),// walker/public, sedan, truck (by size)
        orderCreationTime: Joi.date(),
        orderPlacedTime: Joi.date(),
        orderPickedUpTime: Joi.date(),
        orderDeliveredTime: Joi.date(),
        orderState: Joi.string(), // created/confirmed/pickedUp/delivered
        expirationDate: Joi.date(),
        isConfirmed: Joi.boolean(),
        paymentRecordId: Joi.boolean()
    };

    return Joi.validate(order, schema);
}

// in order use in multiple places
exports.orderSchema = orderSchema;

exports.Order = Order;
exports.validateOrder = validateOrder;