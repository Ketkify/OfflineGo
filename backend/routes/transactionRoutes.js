const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const transactionController = require('../controller/transactionController');

router.get('/', verifyToken, transactionController.getTransactions);

router.post('/', verifyToken, transactionController.addTransaction);

module.exports = router;
