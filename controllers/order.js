"use strict";

/*
 Todo: 

 // MongoDb creates its own unique id, are we going to make an another order ID
 // for our better understading 

*/

// modules
const auth = require("../middleware/auth");
const { Order, validateOrder } = require("./../models/order");
const { User } = require("./../models/user");
const uuidv1 = require("uuid/v1");
const fawn = require("fawn");
const _ = require("lodash");

const mongoose = require("mongoose");

fawn.init(mongoose);

// Handle get all groups
exports.getAll = async function(req, res) {
  let orders = await Order.find()
    .sort("_id")
    .populate("userId"); // referecing to another document

  if (!orders) return res.status(404).send("No orders");
  orders = orders.map(order => {
    const _order = {
      _id: order._id
      // firstName: order.userId.name.firstName,
      // lastName: order.userId.name.lastName
    };
    return _order;
  });
  res.send(orders);
};

// order might be requested by goer and user.

// Handle get by Id
exports.getById = async function(req, res) {
  if (
    !req.params.id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    )
  ) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    res.status(404).send("Wrong Object ID");
  }
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID is not found");
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
exports.deleteById = async function(req, res) {
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order)
    return res.status(404).send("The Order with the given Id Not Found");
  res.send(order);
};

// Handle put
exports.put = async function(req, res) {
  const { error } = validateOrder(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);
  // const order = await Order.findByIdAndUpdate(req.params.id,
  //     {
  //         : '1231231231'
  //     }, { new: true });
  // if (!order) return res.status(404).send("order with the given ID not found");
  // res.send(order);
};

// Handle post
exports.post = async function(req, res) {
  // authorization

  // vallidation input
  const { error } = validateOrder(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User.");

  // check available order count'
  // transaction?
  if (user.onGoindOrderCount >= 5)
    return res.status(400).sned("Number of the posted order exceeds 5");
  var order = new Order({
    _id: uuidv1(),
    userId: user._id,
    origin: req.body.origin,
    destination: req.body.destination,
    item: req.body.item,
    orderDescription: req.body.orderDescription,
    preferredDeliveryMethodType: req.body.preferredDeliveryMethodType,
    orderCreationTime: Date.now()
  });

  try {
    new Fawn.task()
      .save("order-collection", order)
      .update(
        "user-collection",
        { _id: user._id },
        {
          $inc: { onGoindOrderCount: 1 }
        }
      )
      .run();

    res.send(order);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
};
