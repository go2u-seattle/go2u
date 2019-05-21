'user strict';

const uuidv1 = require('uuid/v1');
const User = require('./../models/user');
const Goer = require('./../models/goer');




// modules
const { Bid, validate} = require('../models/bid');

// Handle get all bids for goerId
exports.getAllBidsByGoerId = function(req, res) {
  // populate('goer');
};

// Handle get all bids for orderId
exports.getAllBidsByOrderId = function(req, res)
{

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
  // to make sure we have given goer Id.

  

  // to make sure we have given user Id.

  // to make sure we have given order Id.


  // var bid = new Bid({
  //   bidId: uuidv1(),
  //   orderId: 
  // })
  // create a bid from req.body

  // send back with res

    // to make sure we have given email.
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    // make sure user is not already registered.
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invliad email or password');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invliad email or password');
  
    res.send(true);
}