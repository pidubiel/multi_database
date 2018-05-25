const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    userId: {
      type: String,
      required: true,
      trim: true
    },
    mediaType: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    }
});

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;