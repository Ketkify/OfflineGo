const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const transactionController = require('../controller/transactionController');

// 🔐 Get all transactions (protected)
router.get('/', verifyToken, transactionController.getTransactions);

// ➕ Add a new transaction (protected)
router.post('/', verifyToken, transactionController.addTransaction);

module.exports = router;
