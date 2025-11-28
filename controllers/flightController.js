const Flight = require('../models/Flight');
const User = require('../models/User');
const Booking = require('../models/Booking');

// --- Helper function to update user badge based on points ---
const updateUserBadge = (user) => {
  const points = user.greenPoints;
  if (points >= 3000) user.badge = 'Platinum';
  else if (points >= 1500) user.badge = 'Gold';
  else if (points >= 500) user.badge = 'Silver';
  else user.badge = 'Bronze';
};

// --- Controller actions ---

exports.getHomePage = (req, res) => {
  res.render('index', { userId: req.session.userId });
};

exports.getAllFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const searchCriteria = {};
    if (from) searchCriteria.from = new RegExp(from, 'i');
    if (to) searchCriteria.to = new RegExp(to, 'i');
    const flights = await Flight.find(searchCriteria);
    res.render('flights', { flights: flights, userId: req.session.userId });
  } catch (error) {
    res.status(500).send('Error loading flights');
  }
};

exports.getFlightDetails = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('details', { flight, userId: req.session.userId });
  } catch (error) {
    res.status(500).send('Error getting flight details');
  }
};

exports.bookFlight = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    const user = await User.findById(req.session.userId);
    const flight = await Flight.findById(req.params.id);

    if (!user || !flight) {
      return res.status(404).send('User or Flight not found.');
    }

    const { class: selectedClass } = req.body;
    if (!selectedClass || !['economy', 'business', 'economy_flex'].includes(selectedClass)) {
      return res.status(400).send('Invalid class selection.');
    }

    // *** LOGIC IMPROVEMENT ***
    // 1. Define multipliers centrally
    const multipliers = { economy: 1, economy_flex: 1.2, business: 1.5 };
    const multiplier = multipliers[selectedClass];

    // 2. Calculate the exact points for this booking
    const pointsAwarded = Math.round((flight.greenPoints || 0) * multiplier);

    // 3. Create the booking with the exact points earned stored
    const newBooking = new Booking({
      user: user._id,
      flight: flight._id,
      class: selectedClass,
      pointsEarned: pointsAwarded // Storing the calculated points
    });
    
    // 4. Update user's total points
    user.greenPoints += pointsAwarded;
    updateUserBadge(user);

    // 5. Save both documents concurrently for better performance
    await Promise.all([newBooking.save(), user.save()]);

    res.redirect('/users/dashboard');

  } catch (error) {
    // Handle potential duplicate booking error
    if (error.code === 11000) {
        // You can add a specific user-friendly message here
        return res.status(409).send('You have already booked this flight in the selected class.');
    }
    console.error('Booking Error:', error);
    res.status(500).send('An error occurred while booking the flight.');
  }
};
