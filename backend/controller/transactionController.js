const Transaction = require('../models/Transaction');

// ✅ Fetch all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// ➕ Add new transaction for the logged-in user
exports.addTransaction = async (req, res) => {
  try {
    const { amount, note, type } = req.body;

    const newTransaction = new Transaction({
      userId: req.userId,
      amount,
      note,
      type,
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction saved' });
  } catch (err) {
    console.error('Error saving transaction:', err);
    res.status(400).json({ message: 'Failed to save transaction' });
  }
};
