'user strict';

var mongoose = require('mongoose');

var messageCollectionName = 'message-collection';
var messageModelName = 'Message';

const messageSchema = new mongoose.Schema({
  goerId: {
    type: String,
    required: true
  },
  userId: {

  },
  orderId: {
    
  },
  content: {
    type: String,
    requried: true,
    default: null
  },
  date: {
    type: Date,
    default: Date.now,
    // exprires:
  },
  img: {
    type: String, //url
    required: false  
  }
});

const Message = mongoose.model(messageModelName, messageSchema, messageCollectionName);

function validateMessage(message) {
    // joi schema 
    // leave those only elemetns that client can send
    const schema = {
        goerId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        userId: Joi.objectId().required(),
        //   userId: Joi.string().regex(/^[a-zA-Z0-9]{3,50}$/),
        orderId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        content: Joi.string().alphanum().min(10).max(100).required(),
        img: Joi.string()
    };

    return Joi.validate(message, schema);
}

// in order use in multiple places
exports.messageSchema = messageSchema;
exports.Message = Message;
exports.validateMessage = validateMessage;