const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth'); 

app.use('/api', authRoutes); 

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
