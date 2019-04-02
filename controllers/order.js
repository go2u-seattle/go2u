'use strict';

// modules
var orderModel = require('../models/order');

// Handle get all groups
exports.getAll = function(req, res)
{
    orderModel.find({})
        .then(function(groups) {
            res.send(groups);
        });
};

// Handle get by Id
exports.getById = function(req, res)
{
    orderModel.find({ name: 'test-group' })
        .then(function(groups) {
            res.send(groups);
        });
};


// Handle delete by Id
exports.deleteById = function(req, res)
{
    orderModel.deleteOne({})
        .then();
};

// Handle put
exports.put = function(req, res) 
{
    orderModel.updateOne({})
        .then();
};

// Handle post
exports.post = function(req, res)
{
    var order = new orderModel(req.body);
    order.save();
    // orderModel.create(req.body)
    //     .then();
};