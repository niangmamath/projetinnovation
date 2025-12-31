const User = require('../models/User');
const Booking = require('../models/Booking');
const { calculateCarbonFootprint } = require('../utils/carbonCalculator');

exports.getDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }
  
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
        req.session.destroy();
        return res.redirect('/users/login');
    }

    if (!user.badge) {
      user.badge = 'Bronze';
    }

    const bookings = await Booking.find({ user: user._id }).populate('flight');

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

exports.getCarbonFootprintPage = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    const bookings = await Booking.find({ user: req.session.userId }).populate('flight');
    let totalCarbonFootprint = 0;

    const bookingsWithCarbon = bookings
      .filter(booking => booking.flight) // Filter out bookings with deleted flights
      .map(booking => {
        // Default to 'economy' if class is not specified or invalid
        const validClasses = ['economy', 'business', 'economy_flex'];
        const bookingClass = validClasses.includes(booking.class) ? booking.class : 'economy';

        const carbonFootprint = calculateCarbonFootprint(booking.flight, bookingClass);
        totalCarbonFootprint += carbonFootprint;
        return { ...booking.toObject(), carbonFootprint };
      });

    res.render('carbon', {
      bookings: bookingsWithCarbon,
      totalCarbonFootprint,
      userId: req.session.userId
    });
  } catch (error) {
    console.error('Error fetching carbon footprint data:', error);
    res.status(500).send('Error loading carbon footprint page');
  }
};

exports.getLeaderboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  try {
    const topUsers = await User.find()
      .sort({ greenPoints: -1 })
      .limit(10);

    res.render('leaderboard', {
      users: topUsers,
      userId: req.session.userId
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Error loading leaderboard');
  }
};
