require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sectionRoute = require('./routes/section.route');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const frontEndURL = process.env.FRONT_END_URL
const backEndURL = process.env.BACK_END_URL
// Comprehensive CORS configuration for local development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    const allowedOrigins = [
      'https://mern-law-system.vercel.app',
      'https://mern-law-system-v1vv.vercel.app',
      'http://mern-law-system.vercel.app',
      'http://mern-law-system-v1vv.vercel.app',
      frontEndURL,
      backEndURL
    ];

    // If no origin (like server-to-server calls), allow
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/', sectionRoute);

// // CORS preflight handler
// app.options('*', cors(corsOptions));


// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
