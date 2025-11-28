const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  airline: String,
  date: Date,
  departure_time: String,
  arrival_time: String,
  duration: Number,
  price: {
    economy: Number,
    business: Number
  },
  carbon_emissions: Number, // Represents the ecological aspect
  greenPoints: { // Added greenPoints field
    type: Number,
    default: 100 // Default value if not specified
  }
});

module.exports = mongoose.model('Flight', flightSchema);
