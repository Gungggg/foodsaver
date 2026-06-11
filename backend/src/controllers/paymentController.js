/**
 * @fileoverview Payment controller – handles charge initiation and webhook callbacks.
 */
const paymentService = require('../services/paymentService');
const { successResponse, errorResponse } = require('../utils/response');

class PaymentController {
  /**
   * POST /api/v1/payments/charge
   */
  async createCharge(req, res) {
    try {
      const result = await paymentService.createCharge(req.body.order_id, req.user.id);
      return successResponse(res, 'Payment initiated.', result, 201);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * POST /api/v1/payments/callback
   * Midtrans webhook – no auth required.
   */
  async handleCallback(req, res) {
    try {
      const payment = await paymentService.handleCallback(req.body);
      return successResponse(res, 'Notification processed.', { payment_status: payment.status });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/payments/:orderId/status
   */
  async getPaymentStatus(req, res) {
    try {
      const payment = await paymentService.getPaymentStatus(req.params.orderId, req.user.id);
      return successResponse(res, 'Payment status retrieved.', payment);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new PaymentController();
