const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB connection error:', err));

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to OfflineGo Backend API 🚀');
});
module.exports = app;
