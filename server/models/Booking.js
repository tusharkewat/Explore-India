const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinationSlug: { type: String, required: true },
  destinationName: { type: String, required: true },
  travelDate: { type: String, required: true },
  travelers: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
