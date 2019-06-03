'use strict';

// packages
var mongoose = require('mongoose');
const Joi = require('joi');
// constants
var userCollectionName = 'user-collection';
var userModelName = 'User';
const uuidv1 = require('uuid/v1');


// var LoginType = {
//   FACEBOOK: 1,
//   GOOGLE: 2,
//   NOSNS: 3,
//   properties: {
//     1: { name: "Facebook", code: 'F' },
//     2: { name: "Google", code: 'G' },
//     3: { name: "NoSNS", code: 'N' }
//   }
// }
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv1()
  },
  pushToken: {
    type: String,
    default: null
  },
  name: {
    lastName: String,
    middleName: String,
    firstName: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: null
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    default: null
  },
  isGoer: {
    type: Boolean,
    default: false
  },
  phone: {
    number: String,
    isVerified: Boolean
  },
  paymentInformationId: String, // two options: 1. referencing 2. embeddeding doc
  // loginType: LoginType,
  loginType: String,

  // we just need to concern  with url's that point to an image location endpoint, and client will resolves to retrieving data from MongoDB  or S3.
  // let the brower fetch the image. 
  // best solution is to upload to Amazon S3 and save the ID dirextly in MongoDB (document)
  profilePicture: {
    type: String,
    required: false,
    default: null
  },
  onGoingOrderCount: {
    type: Number,
    default: 0,
    required: false
  }
});

const User = mongoose.model(userModelName, userSchema, userCollectionName);

function validateUser(user) {
  const nameSchema = Joi.object({
    lastName: Joi.string().required(),
    middleName: Joi.string(),
    firstName: Joi.string().required(),
    required: Joi.boolean().default(false)
  });
  const phoneSchema = Joi.object({
    number: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    isVerified: Joi.boolean().required()
  });

  const schema = {
    _id: Joi.string(), //.regex(/^[a-zA-Z0-9]{3,50}$/),
    name: nameSchema,
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    isGoer: Joi.boolean(),
    phone: phoneSchema,
    paymentInformationId: Joi.string(),
    loginType: Joi.string(),
    // loginType: Joi.any().valid(LoginType).required(),
    priflePicture: Joi.string(),
    onGoingOrderCount: Joi.number().positive().max(5).integer()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
