const { sendOTP, verifyOTP } = require('../utils/twilio');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ 1. Send OTP (no user existence check here)
const sendOtp = async () => {
    if (!form.phone) return Alert.alert('Error', 'Enter your phone number');
  
    try {
      const res = await fetch('http://10.0.2.2:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP. Server not reachable.');
      console.error('sendOtp error:', err);
    }
  };
  

// ✅ 2. Verify OTP and Register (checks all unique fields)
const verifyOtp = async (req, res) => {
  const { fullName, username, phone, email, password, otp } = req.body;

  if (!fullName || !username || !phone || !email || !password || !otp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const verification = await verifyOTP(phone, otp);

    if (!verification || verification.status !== 'approved') {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { phone }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      username,
      phone,
      email,
      password: hashedPassword,
      verified: true,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('Verify OTP error:', err.message);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// ✅ 3. Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || !user.verified) {
      return res.status(401).json({ message: 'Invalid username or not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { sendOtp, verifyOtp, login };
