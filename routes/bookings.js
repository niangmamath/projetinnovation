const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');

// Middleware to ensure user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/users/login');
  }
};

// DELETE /:id - Cancel/Delete a booking
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.session.userId;

    // Find the booking first to ensure it belongs to the logged-in user
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      // Booking not found, maybe already deleted.
      return res.redirect('/dashboard');
    }

    // Security check: Ensure the user owns this booking
    if (booking.user.toString() !== userId) {
       return res.status(403).send('You are not authorized to cancel this booking.');
    }
    
    await Booking.findByIdAndDelete(bookingId);

    // Redirect back to the dashboard, maybe with a success message in the future
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.redirect('/dashboard');
  }
});

module.exports = router;
