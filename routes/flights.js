const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Main route for displaying the home page
router.get('/', flightController.getHomePage);

// Display all flights (search results)
router.get('/flights', flightController.getAllFlights);

// Display details for a specific flight
// IMPORTANT: This was changed from /:id to /flights/:id to avoid conflicts
router.get('/flights/:id', flightController.getFlightDetails);

// Handle booking a flight
// IMPORTANT: This was changed from /:id/book to /flights/:id/book
router.post('/flights/:id/book', flightController.bookFlight);

module.exports = router;
