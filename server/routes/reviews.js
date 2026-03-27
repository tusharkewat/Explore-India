const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  try {
    const { destinationSlug, rating, comment } = req.body;
    const review = await Review.create({
      userId: req.user._id,
      userName: req.user.name,
      destinationSlug,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const reviews = await Review.find({ destinationSlug: req.params.slug }).sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
