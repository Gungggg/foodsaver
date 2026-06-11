/**
 * @fileoverview Payment routes.
 */
const { Router } = require('express');
const paymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');
const { validatePayment } = require('../middleware/validate');

const router = Router();

// Webhook endpoint – no auth (Midtrans calls this directly)
router.post('/callback', paymentController.handleCallback);

// Authenticated routes
router.post('/charge', authenticateToken, validatePayment, paymentController.createCharge);
router.get('/:orderId/status', authenticateToken, paymentController.getPaymentStatus);

module.exports = router;
