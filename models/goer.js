'use strict';

// packages
var mongoose = require('mongoose');

// constants
var goerCollectionName = '';
var goerModelname = '';

var goerSchema = mongoose.Schema({
    goerId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

var goerModel = mongoose.model(
    goerModelname,
    goerSchema,
    goerCollectionName
);

module.exports = goerModel;