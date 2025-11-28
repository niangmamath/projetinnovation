const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isLoggedIn } = require('../middleware/auth'); // Middleware to protect routes

// Route to initiate the flight change process
router.post('/:id/initiate-change', isLoggedIn, bookingController.initiateChange);

// Route to handle the deletion of a booking
router.delete('/:id', isLoggedIn, bookingController.deleteBooking);

module.exports = router;
