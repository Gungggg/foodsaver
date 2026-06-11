/**
 * @fileoverview Order controller – handles order creation, listing, QR verification.
 */
const orderService = require('../services/orderService');
const { Merchant } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

class OrderController {
  /**
   * POST /api/v1/orders
   */
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.user.id, req.body);
      return successResponse(res, 'Order placed successfully. Complete payment within 15 minutes.', order, 201);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/orders
   */
  async getCustomerOrders(req, res) {
    try {
      const result = await orderService.getCustomerOrders(req.user.id, req.query);
      return paginatedResponse(res, 'Orders retrieved.', result.rows, {
        page: result.page,
        limit: result.limit,
        total: result.count,
      });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/orders/:id
   */
  async getOrder(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user.id);
      return successResponse(res, 'Order details retrieved.', order);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/merchant/orders
   */
  async getMerchantOrders(req, res) {
    try {
      const merchant = await Merchant.findOne({ where: { user_id: req.user.id } });
      if (!merchant) return errorResponse(res, 'Merchant profile not found.', 404);

      const result = await orderService.getMerchantOrders(merchant.id, req.query);
      return paginatedResponse(res, 'Merchant orders retrieved.', result.rows, {
        page: result.page,
        limit: result.limit,
        total: result.count,
      });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PATCH /api/v1/merchant/orders/:id/verify
   */
  async verifyPickup(req, res) {
    try {
      const merchant = await Merchant.findOne({ where: { user_id: req.user.id } });
      if (!merchant) return errorResponse(res, 'Merchant profile not found.', 404);

      const { qr_token } = req.body;
      if (!qr_token) return errorResponse(res, 'QR token is required.', 422);

      const order = await orderService.verifyPickup(req.params.id, merchant.id, qr_token);
      return successResponse(res, 'Pickup verified successfully.', order);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new OrderController();
