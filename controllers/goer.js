'use strict';

// modules
const { Goer, validateGoer } = require('../models/goer');
const uuidv1 = require('uuid/v1');

// Handle get all goers
exports.getAll = function(req, res) {
  Goer.find().sort('goerId')
    .then( users => {
      res.send(users)
    });
};

// Handle get by Id\
// should handle that case when wrong type of id is passed.
exports.getById = async function(req, res)
{
  const goer = await Goer.findById(req.params.id);
  if (!goer) return res.status(404).send('The Goer with the given ID Not Found');
  res.send(goer);
};

// Handle delete By Id 
// Todo: 
// 1.  when id was not passed, 
// 2. unhandled promise rejection
exports.deleteById = async function(req, res)
{
  const goer = await Goer.findByIdAndRemove(req.params.id);
  if (!goer) return res.status(404).send('The Goer with the given Id Not Found');
  res.send(goer);
};

// Handle put
exports.put = async function(req, res) {
  const { error } = validateGoer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const goer = await Goer.findByIdAndUpdate(req.params.id,
    {
      goerId: '1231231231'
    }, {new: true});
  if (!goer) return res.status(404).send("Goer with the given ID not found");
  res.send(goer);
};

// Handle Post
exports.post = function(req,res) {
  const { error } = validateGoer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  var goer = new Goer({
    goerId: uuidv1(),
    userId: uuidv1()
  }).save();
  res.status(201).send(goer);

};