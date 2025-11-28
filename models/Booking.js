const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  
  seatClass: { 
    type: String, 
    required: true, 
    enum: ['economy', 'business'] 
  },

  options: {
    bagageLight: { type: Boolean, default: false },
    vegetarianMeal: { type: Boolean, default: false },
    compensation: { type: Boolean, default: false },
  },
  earnedGreenMiles: Number,
  createdAt: { type: Date, default: Date.now },
});

// CORRECTED: The pre-save hook for populate is not needed and was causing the error.
// Mongoose does not populate on save. Population is for queries (find, findOne, etc.).
// We will remove this incorrect middleware.

module.exports = mongoose.model('Booking', bookingSchema);
