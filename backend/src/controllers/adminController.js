/**
 * @fileoverview Admin controller – merchant management, complaints, analytics.
 */
const adminService = require('../services/adminService');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

class AdminController {
  /**
   * GET /api/v1/admin/merchants
   */
  async listMerchants(req, res) {
    try {
      const result = await adminService.listMerchants(req.query);
      return paginatedResponse(res, 'Merchants retrieved.', result.rows, {
        page: result.page,
        limit: result.limit,
        total: result.count,
      });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/admin/merchants/:id
   */
  async getMerchantDetails(req, res) {
    try {
      const merchant = await adminService.getMerchantDetails(req.params.id);
      return successResponse(res, 'Merchant details retrieved.', merchant);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PATCH /api/v1/admin/merchants/:id/verify
   */
  async verifyMerchant(req, res) {
    try {
      const merchant = await adminService.verifyMerchant(req.params.id, req.body);
      return successResponse(res, `Merchant ${req.body.action}d successfully.`, merchant);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PATCH /api/v1/admin/merchants/:id/status
   */
  async updateMerchantStatus(req, res) {
    try {
      const merchant = await adminService.updateMerchantStatus(req.params.id, req.body);
      return successResponse(res, `Merchant status updated.`, merchant);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/admin/transactions
   */
  async listTransactions(req, res) {
    try {
      const result = await adminService.listTransactions(req.query);
      return paginatedResponse(res, 'Transactions retrieved.', result.rows, {
        page: result.page,
        limit: result.limit,
        total: result.count,
      });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/admin/complaints
   */
  async listComplaints(req, res) {
    try {
      const result = await adminService.listComplaints(req.query);
      return paginatedResponse(res, 'Complaints retrieved.', result.rows, {
        page: result.page,
        limit: result.limit,
        total: result.count,
      });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PATCH /api/v1/admin/complaints/:id
   */
  async updateComplaint(req, res) {
    try {
      const complaint = await adminService.updateComplaint(req.params.id, req.user.id, req.body);
      return successResponse(res, 'Complaint updated.', complaint);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/admin/analytics/overview
   */
  async getOverviewAnalytics(req, res) {
    try {
      const analytics = await adminService.getOverviewAnalytics();
      return successResponse(res, 'Platform analytics retrieved.', analytics);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/admin/analytics/impact
   */
  async getImpactAnalytics(req, res) {
    try {
      const analytics = await adminService.getImpactAnalytics();
      return successResponse(res, 'Platform impact analytics retrieved.', analytics);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new AdminController();
