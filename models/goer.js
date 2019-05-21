'use strict';

// packages
// const Joi = require('joi');
var mongoose = require('mongoose');
// constants
var goerCollectionName = 'goer-collection';
var goerModelName = 'Goer';
// const totalAvailableOrder = 5;  // temporary, in need of a change after discuss.

var VehicleEnum = {
    WALKING: 1,
    BIKE: 2,
    MOTORCYCLE: 3,
    CAR: 4,
    TRUCK: 5,
    VAN: 6,
    BUS: 7
}
const Goer = mongoose.model(goerModelName, new mongoose.Schema({
    goerId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    ongoingOrderCount: {
        type: Number,
        required: false,
        default: 0
    },
    averageStars: {
        Type: Number,
        default: 0
    },
    review: {

    },
    vehicleType: {
        type: VehicleEnum
    }

}), goerCollectionName);

function validateGoer(goer) {
    const schema = {
      goerId: Joi.string().min(5).max(20).required(),
      userId: Joi.string().min(5).max(20).required(),
      vehicleType: Joi.VehicleEnum().required()
    };
    return Joi.validate(goer, schema);
}

exports.Goer = Goer;
exports.validateGoer = validateGoer;
