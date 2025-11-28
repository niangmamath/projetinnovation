const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Main route for displaying the search form and handling search queries
router.get('/', flightController.searchFlights);

// Route to display details for a specific flight
router.get('/:id', flightController.getFlightDetails);

// Route to handle booking a flight
router.post('/:id/book', flightController.bookFlight);

module.exports = router;