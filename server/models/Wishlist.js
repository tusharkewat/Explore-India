const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinationSlug: { type: String, required: true },
  destinationName: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure a user only wishlists a destination once
wishlistSchema.index({ userId: 1, destinationSlug: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
