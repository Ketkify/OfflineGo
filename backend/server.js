// server.js (or index.js or app.js)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB (optional)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth'); // <-- your auth.js

// Use Routes
app.use('/api', authRoutes); // now routes like /api/send-otp are active

// Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
