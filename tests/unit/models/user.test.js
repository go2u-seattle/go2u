
const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


// describe is a test suite is contatiner for multiple tests
describe('user.generateAuthToken', () => {
  // payload 
  const payload = { 
    _id: 1,   // because we are generating id with uuidv, it's string type.
    isAdmin: false,
    name: {
      lastName: "Lim",
      firstName: "Yuun"
    },
    email: "go2u@gmail.com",
    password: "12345abcde",
    phone: {
      number: '12312412',
      isVerified: true
    }
  };
  it('should return a vlid JWT', () => {
    const user = new User(payload);
    const token = user.generateAuthToken(); // conver object id to hexadecimal to store in web token
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject({ _id: "1", isAdmin: false});
    
  });
});