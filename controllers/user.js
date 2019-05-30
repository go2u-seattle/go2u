'use strict';

// modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const uuidv1 = require('uuid/v1');

// Handle post
exports.post = async function (req, res) {
  // validation required 
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // make sure user is not already registerd.
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send('Uesr already registered');

  user = new User({
    _id: uuidv1(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    loginType: req.body.loginType,
    profilePciture: req.body.profilePciture
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt); // use await because we want to use promise

  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));
};

// Handle get all users
/*
  To do: we need decide which properties we want to return to the client.
*/
exports.getAll = async function (req, res) {
  // we may use name to sort
  let users = await User.find().sort('_id')
  if (!users) return res.status(404).send('No users');
  users = users.map(user => {
    const _user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      // userId: user.userId
    }
    return user;
  })
  res.send(users);
};

// Handle get by userId 
/*
  To do:
  1. we need decide which properties we want to return to the client.
  2. find by userId in the req.body
*/
exports.getByUserId = async function (req, res) {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('The User with the given ID is not found');
  res.send(_.pick(user, ['_id', 'name', 'email']));
};

// Handle queries 
// with id?
exports.query = function (req, res) {

};

// Handle delete By userId
exports.deleteByUserId = async function (req, res) {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send('The user with the given ID was not found)');
  res.send(user);
};

// Handle put
exports.put = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne(req.params.id);
  if (!user) return res.status(404).send('User with the given ID not found');

  // only update fields that were actually passed...
  if (req.body.message !== null) {
    review.message = req.body.message;
  }
  if (req.body.score !== null) {
    review.score = req.body.score;
  }
  res.send(user);
}
