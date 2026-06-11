/**
 * @fileoverview Impact controller – customer and platform impact endpoints.
 */
const impactService = require('../services/impactService');
const { successResponse, errorResponse } = require('../utils/response');

class ImpactController {
  /**
   * GET /api/v1/impact/me
   */
  async getCustomerImpact(req, res) {
    try {
      const impact = await impactService.getCustomerImpact(req.user.id);
      return successResponse(res, 'Your impact summary retrieved.', impact);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/impact/platform
   */
  async getPlatformImpact(req, res) {
    try {
      const impact = await impactService.getPlatformImpact();
      return successResponse(res, 'Platform impact statistics retrieved.', impact);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new ImpactController();
