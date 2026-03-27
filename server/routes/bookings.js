const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  try {
    const { destinationSlug, destinationName, travelDate, travelers, totalPrice } = req.body;
    const booking = await Booking.create({
      userId: req.user._id,
      destinationSlug,
      destinationName,
      travelDate,
      travelers,
      totalPrice
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
