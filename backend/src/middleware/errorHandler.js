const sendAlert = require('../utils/alerter');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Full error log for developers
  console.error({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  });

  // Send email alert for server errors
  sendAlert(err, req);

  // Don't expose bug details to users
  if (!err.isOperational) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Our team has been notified.'
    });
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

module.exports = errorHandler;