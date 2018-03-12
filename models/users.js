const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name field is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name field is required']
  },
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  
});

const User = mongoose.model('user', userSchema);

module.exports = User;