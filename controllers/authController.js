const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    // --- CORRECTED: Use 'username' to match the model schema ---
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // --- CORRECTED: Pass 'username' to the new User object ---
    const user = new User({ username, email, password: hashedPassword });
    
    await user.save();
    req.session.userId = user._id;
    res.redirect('/users/dashboard');

  } catch (error) {
    // Check for duplicate email error (code 11000)
    if (error.code === 11000) {
      return res.status(400).render('register', { 
        error: 'This email address is already in use. Please try another one.' 
      });
    }
    
    // Handle other validation or unexpected errors
    console.error('Registration Error:', error.message);
    res.status(500).render('register', { 
      error: 'Registration failed. Please ensure all fields are correct.' 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      return res.redirect('/users/dashboard');
    }
    res.status(401).render('login', { error: 'Invalid email or password.' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).render('login', { error: 'An error occurred during login.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out.');
    }
    res.redirect('/');
  });
};
