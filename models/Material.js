const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  costPerKg: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
