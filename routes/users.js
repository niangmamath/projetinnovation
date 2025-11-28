const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.register);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/dashboard', userController.getDashboard);

// --- NEW: Route for the leaderboard ---
router.get('/leaderboard', userController.getLeaderboard);

module.exports = router;
