const User = require('../models/User');
const Booking = require('../models/Booking'); // We need the Booking model

exports.getDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }
  
  try {
    // 1. Fetch the logged-in user to get their profile info (name, points, badge)
    const user = await User.findById(req.session.userId);

    if (!user) {
        // This case can happen if the user was deleted but the session persists
        req.session.destroy();
        return res.redirect('/users/login');
    }

    // FIX: Ensure every user has a badge. If not, default to 'Bronze'.
    // This prevents the 'cannot read property of undefined' error in the EJS template.
    if (!user.badge) {
      user.badge = 'Bronze';
    }

    // 2. Fetch all bookings for that user and populate the flight details
    const bookings = await Booking.find({ user: user._id }).populate('flight');

    // 3. Render the dashboard, passing both the user object and their bookings
    res.render('dashboard', { 
      user: user, 
      bookings: bookings, 
      userId: req.session.userId
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Error loading dashboard');
  }
};

// --- NEW: Leaderboard Logic with Auth Guard ---
exports.getLeaderboard = async (req, res) => {
  // AUTH GUARD: If user is not logged in, redirect to login page
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    // Fetch top 10 users, sorted by greenPoints in descending order
    const topUsers = await User.find()
      .sort({ greenPoints: -1 })
      .limit(10);

    res.render('leaderboard', {
      users: topUsers,
      userId: req.session.userId // Pass userId for the header
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Error loading leaderboard');
  }
};
