const express = require('express');
const router = express.Router();
const AppError = require('../utils/AppError');

// Test 1: Simulate database timeout
router.get('/db-timeout', async (req, res, next) => {
  try {
    console.log('Simulating database timeout...');
    await new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB connection timeout')), 3000)
    );
  } catch (error) {
    next(new AppError('Database timeout after 3 seconds', 503));
  }
});

// Test 2: Simulate unexpected crash (bug)
router.get('/crash', (req, res, next) => {
  try {
    // This simulates a real programming bug
    const obj = null;
    obj.someProperty; // This will throw a TypeError
  } catch (error) {
    next(error); // isOperational is false, so user gets generic message
  }
});

// Test 3: Normal endpoint (for comparison)
router.get('/ok', (req, res) => {
  res.json({ success: true, message: 'Everything working fine!' });
});

module.exports = router;