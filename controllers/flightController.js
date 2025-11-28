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
    res.render('flights', { flights: flights, userId: req.session.userId, messages: req.flash() });
  } catch (error) {
    res.status(500).send('Error loading flights');
  }
};

exports.getFlightDetails = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('details', { flight, userId: req.session.userId, messages: req.flash() });
  } catch (error) {
    res.status(500).send('Error getting flight details');
  }
};

exports.bookFlight = async (req, res) => {
  if (!req.session.userId) {
    req.flash('error', 'Vous devez être connecté pour réserver.');
    return res.redirect('/users/login');
  }

  try {
    const user = await User.findById(req.session.userId);
    const newFlight = await Flight.findById(req.params.id);

    if (!user || !newFlight) {
      req.flash('error', 'Utilisateur ou vol non trouvé.');
      return res.redirect('/flights');
    }

    const { class: selectedClass } = req.body;
    const validClasses = ['economy', 'business', 'economy_flex'];
    if (!selectedClass || !validClasses.includes(selectedClass)) {
        req.flash('error', 'Classe de voyage invalide.');
        return res.redirect(`/flights/${newFlight._id}`);
    }

    const multipliers = { economy: 1, economy_flex: 1.2, business: 1.5 };
    const pointsForNewFlight = Math.round((newFlight.greenPoints || 0) * multipliers[selectedClass]);

    // === TRANSACTIONAL FLIGHT CHANGE LOGIC ===
    if (req.session.changeBookingId) {
        const oldBookingId = req.session.changeBookingId;
        const oldBooking = await Booking.findById(oldBookingId);

        if (!oldBooking || oldBooking.user.toString() !== user._id.toString()) {
            req.flash('error', 'La réservation que vous essayez de modifier est invalide.');
            delete req.session.changeBookingId; // Clean up session
            return res.redirect('/users/dashboard');
        }

        // Create the new booking first
        const newBooking = new Booking({
            user: user._id,
            flight: newFlight._id,
            class: selectedClass,
            pointsEarned: pointsForNewFlight
        });

        // Adjust user points: subtract old, add new
        user.greenPoints = (user.greenPoints - oldBooking.pointsEarned) + pointsForNewFlight;
        if (user.greenPoints < 0) user.greenPoints = 0;
        updateUserBadge(user);

        // Perform operations: delete old, save new, update user
        await Promise.all([
            oldBooking.deleteOne(),
            newBooking.save(),
            user.save()
        ]);

        delete req.session.changeBookingId; // IMPORTANT: Clean up the session
        req.flash('success', 'Votre vol a été modifié avec succès!');
        res.redirect('/users/dashboard');

    } else {
        // === STANDARD BOOKING LOGIC ===
        const newBooking = new Booking({
            user: user._id,
            flight: newFlight._id,
            class: selectedClass,
            pointsEarned: pointsForNewFlight
        });

        user.greenPoints += pointsForNewFlight;
        updateUserBadge(user);

        await Promise.all([newBooking.save(), user.save()]);

        req.flash('success', 'Vol réservé avec succès!');
        res.redirect('/users/dashboard');
    }

  } catch (error) {
    if (error.code === 11000) {
        req.flash('error', 'Vous avez déjà une réservation pour ce vol dans cette classe.');
        return res.redirect(`/flights/${req.params.id}`);
    }
    console.error('Booking Error:', error);
    req.flash('error', 'Une erreur est survenue lors de la réservation.');
    res.redirect('/flights');
  }
};