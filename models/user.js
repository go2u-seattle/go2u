'use strict';

// packages
var mongoose = require('mongoose');

// constants
var userCollectionName = 'user-collection';
var userModelName = 'User';

const User = mongoose.model(userModelName, new mongoose.Schema({
    // userId: {
    //     type: String,
    //     require: true
    // },    // either guid or token
    
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isGoer: {
        type: Boolean,
        required: true,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 15
    }
}), userCollectionName);

function validateUser(user) {
    const schema = {
        userName: Joi.string().min(5).max(20).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        userId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        isGoer: Joi.boolean(),
        phone: Joi.string().min(9).max(15).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
