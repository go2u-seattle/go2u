'use strict';

// packages
// const Joi = require('joi');
var mongoose = require('mongoose');
const Joi = require('joi');
const uuidv1 = require('uuid/v1');

// constants
var goerCollectionName = 'goer-collection';
var goerModelName = 'Goer';
// const totalAvailableOrder = 5;  // temporary, in need of a change after discuss.

// var VehicleEnum = {
//     WALKING: "Walking",
//     BIKE: "Bike",
//     MOTORCYCLE: "Motorcycle",
//     CAR: "Car",
//     TRUCK: "Truck",
//     VAN: "Van",
//     BUS: "Bus"
// }

var VehicleEnum = ["Walking","Bike", "Motorcycle","Car","Truck","Van","Bus"];

const Goer = mongoose.model(goerModelName, new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv1()
    },
    userId: {
        type: String,
        // type: String,
        ref: 'User',
        required: true
    },
    ongoingOrderCount: {
        type: Number,
        required: false,
        default: 0,
        max: 5
    },
    averageStars: {
        Type: Number,
        default: 0
    },
    review: String,
    vehicleType: {
        type: String,
        required: true
    }

}), goerCollectionName);

function validateGoer(goer) {
    const schema = {
      _id: Joi.string(),
      userId: Joi.string().min(5).max(50).required(),
      ongoingOrderCount: Joi.number().positive().max(5),
      averageStars: Joi.number().positive().default(0).max(5),
      review: Joi.string().max(100),
      vehicleType: Joi.any().valid(VehicleEnum).required()
    };
    return Joi.validate(goer, schema);
}

exports.Goer = Goer;
exports.validateGoer = validateGoer;
