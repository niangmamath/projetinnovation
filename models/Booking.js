const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  // This field is crucial to fix the points deduction bug.
  // It stores the actual number of points awarded for this specific booking,
  // including any class multipliers.
  pointsEarned: {
    type: Number,
    required: true,
    default: 0 // Defaulting to 0 for safety with any old data.
  },
  class: {
      type: String,
      required: true,
      enum: ['economy', 'business', 'economy_flex']
  }
});

// A user should not be able to book the exact same flight in the same class more than once.
bookingSchema.index({ user: 1, flight: 1, class: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
