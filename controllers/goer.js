'use strict';

// modules
const { Goer, validateGoer } = require('../models/goer');
const {User} = require('./../models/user');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

// Handle get all goers
exports.getAll = async function (req, res) {
  let goers = await Goer.find().sort('goerId').populate('userId');
  if (!goers) return res.status(404).send('No Goers Found');
  res.send(goers);
  // let goers = goers.map(goer => {
  //   const _goers = {
  //     goerId: goer.goerId,
  //     userId: goer.userId,
  //     ongoingOrderCount: goer.ongoingOrderCount,
  //     averageStars: goer.averageStars,
  //     review: goer.review,
  //     vehicleType: goer.vehicleType
  //   }
  //   return _goers;
  // })
  // res.send(goers)
};

// Handle get by goerId 
// should handle that case when wrong type of id is passed.
// should we give more info of goer.
exports.getById = async function (req, res) {
  const goer = await Goer.findById(req.params.id);
  if (!goer) return res.status(404).send('The Goer with the given ID Not Found');
  res.send(goer);

};

// Handle delete By Id 
// Todo: 
// 1.  when id was not passed, 
// 2. unhandled promise rejection
exports.deleteById = async function (req, res) {
  const goer = await Goer.findByIdAndRemove(req.params.id);
  if (!goer) return res.status(404).send('The Goer with the given Id Not Found');
  res.send(goer);
};

// Handle put
exports.put = async function (req, res) {
  const { error } = validateGoer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const goer = await Goer.findByIdAndUpdate(req.params.id,
    {
      goerId: '1231231231'
    }, { new: true });
  if (!goer) return res.status(404).send("Goer with the given ID not found");
  res.send(goer);
};

// Handle Post
exports.post = async function (req, res) {
  // validate 
  const { error } = validateGoer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id:req.body.userId});
  if (!user) return res.status(404).send('User with the given ID Not Found');

  let goer = await Goer.findOne({ _id:req.body.userId});
  if (goer) return res.status(404).send('Goer already regiestered');

  // let _vehicelType = req.body.vehicleType;
  // console.log(_vehicelType);
  goer = new Goer({
    _id: uuidv1(),
    userId: user._id,
    vehicleType: req.body.vehicleType
  });
  await goer.save();  
  res.send(goer);
};