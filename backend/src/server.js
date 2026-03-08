// MUST be first line - starts tracing before anything else
require('./tracing');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { generalLimiter, registrationLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const registerRoutes = require('./routes/register');
const testRoutes = require('./routes/test');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security & Utility Middleware ──
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));        // logs: POST /api/register 201 45ms
app.use(generalLimiter);      // rate limit all routes

// ── Health Check ──
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + ' seconds',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    },
    service: 'ecell-backend'
  });
});

// ── Routes ──
app.use('/api/register', registrationLimiter, registerRoutes);
app.use('/api/test', testRoutes);

// ── 404 Handler ──
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`
  });
});

// ── Global Error Handler (must be last) ──
app.use(errorHandler);

// ── Start Server ──
const server = app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Handle crashes
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION:', error);
  process.exit(1);
});

module.exports = server;

