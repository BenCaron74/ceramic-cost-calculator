const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
  materialCost: {
    type: Number,
    required: true,
  },
  laborCost: {
    type: Number,
    required: true,
  },
  firingCost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Calculation = mongoose.model('Calculation', CalculationSchema);

module.exports = Calculation;
