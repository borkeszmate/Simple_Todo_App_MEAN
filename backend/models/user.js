const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
 email: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 },
 confirmPassword: {
  type: String,
  required: true
 },
});

module.exports = mongoose.model('userModel', user);