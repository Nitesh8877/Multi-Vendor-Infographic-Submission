// models/User.js
const mongoose = require('mongoose');
const constant=require('../utils/constatnt')
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, default: constant.FREE },
  userType:{type:String,default:"User"}
  // Add any other fields specific to the user model
});

const User = mongoose.model('User', userSchema);

module.exports = User;
