const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🔌 Mount transaction routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

// 🔌 Mount authentication routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// ✅ Root health check route
app.get('/', (req, res) => {
  res.send('Welcome to OfflineGo Backend API 🚀');
});

module.exports = app;
