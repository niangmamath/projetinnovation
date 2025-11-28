const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Initiate a flight change process by storing the old booking's ID in the session.
// @route   POST /bookings/:id/initiate-change
// @access  Private
exports.initiateChange = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.session.userId;

        if (!userId) {
            req.flash('error', 'Vous devez être connecté pour effectuer cette action.');
            return res.redirect('/users/login');
        }

        const booking = await Booking.findById(bookingId);

        if (!booking || booking.user.toString() !== userId) {
            req.flash('error', 'Réservation non trouvée ou non autorisée.');
            return res.redirect('/users/dashboard');
        }

        req.session.changeBookingId = bookingId;

        req.flash('info', 'Veuillez choisir votre nouveau vol. La réservation précédente sera annulée automatiquement.');
        res.redirect('/flights');

    } catch (error) {
        console.error("Erreur lors de l'initiation du changement de vol:", error);
        req.flash('error', "Une erreur est survenue lors du démarrage du processus de changement.");
        res.redirect('/users/dashboard');
    }
};

// @desc    Cancel (delete) a booking
// @route   DELETE /bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.session.userId;

        if (!userId) {
            req.flash('error', 'Vous devez être connecté pour effectuer cette action.');
            return res.redirect('/users/login');
        }

        const booking = await Booking.findById(bookingId);
        
        if (!booking || booking.user.toString() !== userId) {
            req.flash('error', 'Réservation non trouvée ou non autorisée.');
            return res.redirect('/users/dashboard');
        }

        // 1. Revert green points from the user
        const pointsToDeduct = booking.pointsEarned || 0;
        if (pointsToDeduct > 0) {
            await User.findByIdAndUpdate(userId, 
                { $inc: { greenPoints: -pointsToDeduct } }
            );
        }

        // 2. Delete the booking
        await Booking.findByIdAndDelete(bookingId);

        req.flash('success', 'Votre réservation a été annulée avec succès.');
        res.redirect('/users/dashboard');

    } catch (error) {
        console.error("Erreur lors de l'annulation de la réservation:", error);
        req.flash('error', "Erreur lors de l'annulation de la réservation.");
        res.redirect('/users/dashboard');
    }
};
