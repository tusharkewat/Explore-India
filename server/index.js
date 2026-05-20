require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
// Middleware
const corsOrigin = process.env.CLIENT_URL || '*';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Database Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('================================================================');
  console.error('FATAL ERROR: MONGO_URI environment variable is not defined.');
  console.error('Please configure MONGO_URI in your Render service settings.');
  console.error('================================================================');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
// We'll import and use routes here subsequently
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/reviews', require('./routes/reviews'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production' || true) { // Set to true for easier testing/hosting setup
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    }
  });
} else {
  // Basic route for health check in development
  app.get('/*', (req, res) => res.send('API is running'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
