const mongoose = require('mongoose');

const FiringSchema = new mongoose.Schema({
  costPerFiring: {
    type: Number,
    required: true,
  },
  numberOfFirings: {
    type: Number,
    required: true,
  },
  piecesPerFiring: {
    type: Number,
    required: true,
  }
});

const Firing = mongoose.model('Firing', FiringSchema);

module.exports = Firing;
