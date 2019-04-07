'use strict';

// packages
var mongoose = require('mongoose');

// constants
var goerCollectionName = 'goer-collection';
var goerModelName = 'goerModel';

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
    goerModelName,
    goerSchema,
    goerCollectionName
);

module.exports = goerModel;