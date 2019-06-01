'user strict';

const uuidv1 = require('uuid/v1');
const { Goer } = require('./../models/goer');
const { Order } = require('./../models/order');

// modules
const { Bid, validate} = require('../models/bid');

// Handle get all bids for goerId
exports.getAllBidsByGoerId = async function(req, res) {
  const bids = await Bid.findOne({ goerId: req.body.goerId});
  if (!bids) return res.status(404).send('No Bids Found with the given goer id.');
  res.send(bids);
};

// Handle get all bids for orderId
exports.getAllBidsByOrderId = async function(req, res) {
  const bids = await Bid.findOne({ orderId: req.body.orderId});
  if (!bids) return res.status(404).send('No Bids Found with the given goer id.');
  res.send(bids);
};

// Handle delete delete bid by Id
exports.deleteById = function(req,res) {

};

// Handle put
// ** must update expireAt index up on update
exports.put = function(req, res) {
  // if the bid is valid or not

};

// handle Post
exports.post = async function(req, res) {
  // to make sure we have right format of input;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("Bid Shcema Validation done");

  // validate whoever wants to throw a review.
  const goer = await Goer.findOne({ _id: req.body.goerId });
  if (!goer) return res.status(404).send('Goer with the given ID Not Found');
  console.log("Goer Validation done");

  // make sure order exists.
  const order = await Order.findOne({ _id: req.body.orderId });
  if (!order) return res.status(404).send('Order with the given ID Not Found');
  console.log("Order Validation done");

  // make sure the goer hasn't thrown the bid yet.
  // if (checkDuplicate(goer._id, order._id)) {
  //   return res.status(404).send("Bid for this order already made by the goer.");
  // } 
  var bid = await Bid.findOne({ goerId: goer._id});
  if (bid) {
    return ㅗ고res.status(400).send("Bid for this order already made by the goer.");
  }
  console.log("Bid Validation done");

  // make sure the goer hasn't thrown over 5 bids. 
  if (goer.ongoingOrderCount >= 5) {
    return res.status(400).send("No more avaiable bid allowed.");
  }
  console.log("goer's total bid number Validation done");

  bid = new Bid({
    _id: uuidv1(),
    orderId: order._id,
    goerId: goer._id,
    amountInCents: req.body.amountInCents,
    createdDate: Date.now()
  });
  await bid.save();
  goer.ongoingOrderCount = goer.ongoingOrderCount + 1;
  goer.save();
  res.send(bid);
}


