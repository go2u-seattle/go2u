const asyncMiddleware = require('../middleware/async');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');


exports.post = asyncMiddleware(async (req, res) => {
  // to make sure we have given email.
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // make sure user is not already registered.
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invliad email or password');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invliad email or password');

  const token = user.generateAuthToken();
  res.send(token);
})

// information expert principle 
// object that has enough information that expert hsould have knowledge to do


function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

