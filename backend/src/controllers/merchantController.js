/**
 * @fileoverview Merchant controller – profile, documents, analytics.
 */
const merchantService = require('../services/merchantService');
const { successResponse, errorResponse } = require('../utils/response');

class MerchantController {
  /**
   * GET /api/v1/merchant/profile
   */
  async getProfile(req, res) {
    try {
      const profile = await merchantService.getProfile(req.user.id);
      return successResponse(res, 'Merchant profile retrieved.', profile);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PUT /api/v1/merchant/profile
   */
  async updateProfile(req, res) {
    try {
      const logoUrl = req.file ? `/uploads/merchants/${req.file.filename}` : null;
      const profile = await merchantService.updateProfile(req.user.id, req.body, logoUrl);
      return successResponse(res, 'Merchant profile updated.', profile);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * POST /api/v1/merchant/documents
   */
  async uploadDocument(req, res) {
    try {
      if (!req.file) return errorResponse(res, 'Document file is required.', 422);
      if (!req.body.type) return errorResponse(res, 'Document type is required.', 422);

      const fileUrl = `/uploads/documents/${req.file.filename}`;
      const document = await merchantService.uploadDocument(req.user.id, req.body, fileUrl);
      return successResponse(res, 'Document uploaded successfully.', document, 201);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/merchant/documents
   */
  async getDocuments(req, res) {
    try {
      const documents = await merchantService.getDocuments(req.user.id);
      return successResponse(res, 'Documents retrieved.', documents);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/merchant/analytics/sales
   */
  async getSalesAnalytics(req, res) {
    try {
      const analytics = await merchantService.getSalesAnalytics(req.user.id, req.query);
      return successResponse(res, 'Sales analytics retrieved.', analytics);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/merchant/analytics/impact
   */
  async getImpactAnalytics(req, res) {
    try {
      const analytics = await merchantService.getImpactAnalytics(req.user.id);
      return successResponse(res, 'Impact analytics retrieved.', analytics);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new MerchantController();
