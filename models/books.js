const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create book schema

const bookSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  }
  // firstName: {
  //   type: String,
  //   required: [true, 'First name field is required']
  // },
  // lastName: {
  //   type: String,
  //   required: [true, 'Last name field is required']
  // },
  // age: {
  //   type: Number,
  //   required: [true, 'Age is required']
  // }
});

const Book = mongoose.model('book', bookSchema);

module.exports = User;