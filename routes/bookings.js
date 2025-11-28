const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const User = mongoose.model('User');

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/users/login');
  }
};

// DELETE /:id - Final, correct, and robust cancellation logic
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const { userId } = req.session;

    // 1. Find the specific booking to be cancelled.
    // No need to populate the flight anymore, saving a database query.
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      // Booking already deleted or never existed.
      return res.redirect('/users/dashboard');
    }

    // 2. Authorize the action.
    if (booking.user.toString() !== userId) {
      return res.status(403).send('You are not authorized to cancel this booking.');
    }

    // *** THE FINAL FIX ***
    // 3. The exact number of points to deduct is now stored in the booking itself.
    // No more calculation, no more bugs.
    const pointsToDeduct = booking.pointsEarned || 0;

    const promises = [];

    // 4. Update the user's points, if any were earned.
    if (pointsToDeduct > 0) {
      // We use $inc for an atomic and safe subtraction.
      promises.push(
        User.findByIdAndUpdate(userId, { $inc: { greenPoints: -pointsToDeduct } })
      );
    }

    // 5. Delete the booking document.
    promises.push(Booking.findByIdAndDelete(bookingId));

    // 6. Execute both database operations concurrently.
    await Promise.all(promises);
    
    // Optional: You might want to re-fetch the user to update the badge
    // immediately, but it will self-correct on the next booking anyway.

    res.redirect('/users/dashboard');

  } catch (error) {
    console.error('Error during booking cancellation:', error);
    res.redirect('/users/dashboard?error=cancel_failed');
  }
});

module.exports = router;
