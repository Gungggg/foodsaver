/**
 * @fileoverview Express application setup with middleware and route registration.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const routes = require('./routes');
const { errorResponse } = require('./utils/response');

const app = express();

// --------------- Security Middleware ---------------
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// --------------- Body Parsing ---------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --------------- Static Files ---------------
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// --------------- Health Check ---------------
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FoodSaver API is running',
    data: {
      version: '1.0.0',
      docs: '/api/v1',
    },
  });
});

// --------------- API Routes ---------------
app.use('/api/v1', routes);

// --------------- 404 Handler ---------------
app.use((req, res) => {
  errorResponse(res, 'Route not found', 404);
});

// --------------- Global Error Handler ---------------
app.use((err, req, res, _next) => {
  console.error('Unhandled Error:', err);
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;
  errorResponse(res, message, statusCode);
});

module.exports = app;
