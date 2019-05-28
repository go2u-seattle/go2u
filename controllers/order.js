'use strict';

/*
 Todo: 

 // MongoDb creates its own unique id, are we going to make an another order ID
 // for our better understading 

*/


// modules
const { Order, validateOrder } = require('./../models/order');
const { User } = require('./../models/user');
const uuidv1 = require('uuid/v1');

// Handle get all groups
exports.getAll = function (req, res) {
    Order.find().sort('_id')
        .populate('user') // referecing to another document
        .select('name -_id')
        .then(orders => {
            res.send(orders);
        });
};

// order might be requested by goer and user.

// Handle get by Id
exports.getById = async function (req, res) {
    if (!(req.params.id).match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        res.status(404).send('Wrong Object ID');
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID is not found');
    res.send(order);
    // Order.find({ _id: req.params.id })
    //     .then(orders => {
    //         if (!orders) res.status(404).send('Order with the given id Not Found');
    //         res.send(orders);
    //     })
    //     .catch( (error) => {
    //         console.log(error.message);
    //     });
};


// Handle delete by Id
exports.deleteById = async function (req, res) {
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order) return res.status(404).send('The Goer with the given Id Not Found');
  res.send(order);
};

// Handle put
exports.put = async function (req, res) {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const order = await Order.findByIdAndUpdate(req.params.id,
        {
            orderId: '1231231231'
        }, { new: true });
    if (!order) return res.status(404).send("order with the given ID not found");
    res.send(order);
};

// Handle post
exports.post = async function (req, res) {
    // vallidation input 
    const { error } = validateOrder(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    
    const user = await User.findOne(req.body.userId);
    if (!user) return res.status(400).send('Invalid User.');

    // check available order count'
    // transaction? 
    var order = new Order({
        orderId: uuidv1(),
        user: user._id
        // OrderId: 'asdfad',  //req.body,
        // bidId: 'asdfadf'
        // fulfilled: false
    }).save();
    res.status(201).send(order);
};