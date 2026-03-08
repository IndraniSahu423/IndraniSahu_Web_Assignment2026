const express = require('express');
const router = express.Router();
const AppError = require('../utils/AppError');

// Store registrations in memory for demo
// In real app this would be a database
const registrations = [];

// GET all registrations
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: registrations.length,
    data: registrations
  });
});

// POST new registration
router.post('/', async (req, res, next) => {
  try {
    const { name, email, college } = req.body;

    // Validation
    if (!name || !email || !college) {
      throw new AppError('Name, email and college are required', 400);
    }

    if (!email.includes('@')) {
      throw new AppError('Please provide a valid email address', 400);
    }

    // Check duplicate
    const exists = registrations.find(r => r.email === email);
    if (exists) {
      throw new AppError('This email is already registered', 409);
    }

    // Save registration
    const newRegistration = {
      id: registrations.length + 1,
      name,
      email,
      college,
      registeredAt: new Date().toISOString()
    };

    registrations.push(newRegistration);

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: newRegistration
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;