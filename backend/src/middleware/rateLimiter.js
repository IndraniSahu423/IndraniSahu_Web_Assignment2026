const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  message: {
    success: false,
    message: 'Too many requests from this IP. Try again in 15 minutes.'
  }
});

const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many registration attempts. Try again in 1 hour.'
  }
});

module.exports = { generalLimiter, registrationLimiter };