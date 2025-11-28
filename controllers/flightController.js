const Flight = require('../models/Flight');
const User = require('../models/User');
const Booking = require('../models/Booking'); // Import the Booking model

// --- Helper function for badge logic ---
const updateUserBadge = (user) => {
  const points = user.greenPoints;
  let newBadge = 'Bronze'; // Default badge

  if (points >= 3000) {
    newBadge = 'Platinum';
  } else if (points >= 1500) {
    newBadge = 'Gold';
  } else if (points >= 500) {
    newBadge = 'Silver';
  }

  user.badge = newBadge;
};


// Display flights (all or filtered) on the main page
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const searchCriteria = {};

    if (from) searchCriteria.from = new RegExp(from, 'i');
    if (to) searchCriteria.to = new RegExp(to, 'i');

    const flights = await Flight.find(searchCriteria);
    res.render('index', { flights: flights, userId: req.session.userId });
  } catch (error) {
    console.error('Error fetching or searching flights:', error);
    res.status(500).send('Error loading the page');
  }
};


// Get and display details for a single flight
exports.getFlightDetails = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('details', { flight, userId: req.session.userId });
  } catch (error) {
    res.status(500).send('Error getting flight details');
  }
};


// Book a flight for the logged-in user
exports.bookFlight = async (req, res) => {
  // 1. Check if user is logged in
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    // 2. Verify the user and flight exist
    const user = await User.findById(req.session.userId);
    const flight = await Flight.findById(req.params.id);

    if (!user || !flight) {
        // If user or flight is not found, handle appropriately
        req.session.destroy(); // Security measure
        return res.redirect('/users/login');
    }

    const { seatClass, pointsMultiplier } = req.body;

    if (!seatClass || !['economy', 'business'].includes(seatClass)) {
      return res.status(400).send('Invalid class selection.');
    }

    const newBooking = new Booking({
      user: user._id,
      flight: flight._id,
      seatClass: seatClass
    });
    await newBooking.save();

    // 3. Award Green Points based on multiplier and update badge
    const multiplier = parseFloat(pointsMultiplier) || 1;
    const pointsToAward = Math.round(flight.greenPoints * multiplier);
    
    user.greenPoints += pointsToAward;
    updateUserBadge(user);
    await user.save();

    res.redirect('/users/dashboard');

  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).send('An error occurred while booking the flight.');
  }
};
