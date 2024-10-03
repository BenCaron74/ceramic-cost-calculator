const mongoose = require('mongoose');

const LaborSchema = new mongoose.Schema({
  hours: {
    type: Number,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  }
});

const Labor = mongoose.model('Labor', LaborSchema);

module.exports = Labor;
