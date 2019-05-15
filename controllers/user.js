'use strict';

// modules
const {User, validateUser} = require('../models/user');

// Handle post
exports.post = function(req, res) {
  // validation required 
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.details[0].message)
  
  var user = new User({
    
    userName: 'Yuun Lim',
    password: '1234abcd',
    userId: 'yuun123',
    isGoer: true,
    phone: '123-123-1234'

    // userName: req.body.userName,
    // password: req.body.password,
    // userId: req.body.userId,
    // isGoer: req.body.isGoer,
    // phone: req.body.phone
  }).save();
  res.status(201).send(user);
};


// Handle get all users
exports.getAll = function(req, res) {
  // we may use name to sort
  User.find().sort('_id')
    .then( users => {
      res.send(users)
    });
};

// Handle get by userId
exports.getByUserId = async function(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('The User with the given ID is not found');
  res.send(user);

  // User.findById(req.params.id)
  //   .then(function(user) {
  //     if  (!user) { return res.status(404).send("the User with the given Id not Found");}
  //     res.send(user);
  //   })
  //   .catch('Not found ');
};

// Handle queries 
// with id?
exports.query = function(req, res) {

};

// Handle delete By user id
exports.deleteByUserId = async function(req, res) {

  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.statsu(404).send('The user with the given ID was not found)');
  res.send(user);

  // // look up the user with id
  // // not existing, return 404
  // User.findOneAndRemove({ _id : req.params.id }, (err, user) => {
  //   if (err) {
  //     return res.status(404).send('User with the given id not found');
  //   }
  //     console.log('deleting');
  //     User.deleteOne( { userId: req.params.id} );
  //     res.status(200).send('Sucessfully deleted');
  // });

};

// Handle put
exports.put = async function(req, res) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id,
    {
      userName: "Tom"
    }, {new: true});
    // { name: req.body.userName }, 
    
  if (!user) return res.status(404).send('User with the given ID not found');
  res.send(user);
}
