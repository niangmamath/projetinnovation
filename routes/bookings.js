const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Middleware to ensure a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  req.flash('error', 'Vous devez être connecté pour accéder à cette page.');
  res.redirect('/users/login');
};

// @desc    Initiate the flight change process
// @route   POST /bookings/:id/initiate-change
router.post('/:id/initiate-change', isAuthenticated, bookingController.initiateChange);

// @desc    Cancel (delete) a booking
// @route   DELETE /bookings/:id
router.delete('/:id', isAuthenticated, bookingController.deleteBooking);

module.exports = router;
