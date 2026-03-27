const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');

router.post('/toggle', protect, async (req, res) => {
  try {
    const { destinationSlug, destinationName, image, price } = req.body;
    
    const existingItem = await Wishlist.findOne({ userId: req.user._id, destinationSlug });
    
    if (existingItem) {
      await Wishlist.findByIdAndDelete(existingItem._id);
      return res.json({ message: 'Removed from wishlist', action: 'removed' });
    } else {
      const newItem = await Wishlist.create({
        userId: req.user._id,
        destinationSlug,
        destinationName,
        image,
        price
      });
      return res.status(201).json({ message: 'Added to wishlist', action: 'added', item: newItem });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.user._id }).sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
