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
  // --- Fields for Carbon Footprint Calculation ---
  distance: Number,       // Distance in km
  aircraftType: String,   // e.g., 'Boeing 737-800'
  greenPoints: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model('Flight', flightSchema);
