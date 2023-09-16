const mongoose = require('mongoose');
const { regexURL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: (value) => regexURL.test(value),
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (value) => regexURL.test(value),
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (value) => regexURL.test(value),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
