'use strict';

// packages
const Joi = require('joi');
var mongoose = require('mongoose');
// constants
var goerCollectionName = 'goer-collection';
var goerModelName = 'goerModel';

const Goer = mongoose.model(goerModelName, new mongoose.Schema({
    goerId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}), goerCollectionName);

function validateGoer(goer) {
    const schema = {
      goerId: Joi.string().min(5).max(20).required(),
      userId: Joi.string().min(5).max(20).required(),
    };
    return Joi.validate(goer, schema);
}

exports.Goer = Goer;
exports.validateGoer = validateGoer;
