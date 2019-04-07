'use strict';

// packages
var mongoose = require('mongoose');

// constants
var userCollectionName = 'user-collection';
var userModelName = 'userModel';

var userSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    isGoer: {
        type: Boolean,
        required: true,
        default: false
    }
});

var userModel = mongoose.model(
    userModelName,
    userSchema,
    userCollectionName
);

module.exports = userModel;