'use strict';

// packages
var mongoose = require('mongoose');

// constants
var userCollectionName = '';
var userModelname = '';

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

var userModel = mongoose.Model(
    userModelname,
    userSchema,
    userCollectionName
);

module.exports = userModel;