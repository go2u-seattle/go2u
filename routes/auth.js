const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
  // to make sure we have given email.
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // make sure user is not already registered.
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invliad email or password');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invliad email or password');

  res.send(true);
});


function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;