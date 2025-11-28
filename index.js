require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('connect-flash'); // To display messages

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Pre-load/register models
require('./models/User');
require('./models/Flight');
require('./models/Booking');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use method-override. This must be after urlencoded.
app.use(methodOverride('_method'));

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).send());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Flash Message Middleware
app.use(flash());

// Make session and flash messages available in all templates
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.messages = req.flash();
  next();
});

// --- New Sustainability Route ---
app.get('/sustainability', (req, res) => {
  res.render('sustainability');
});

// Routes
app.use('/', require('./routes/flights'));
app.use('/users', require('./routes/users'));
app.use('/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
