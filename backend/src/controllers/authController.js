/**
 * @fileoverview Auth controller – handles HTTP layer for authentication.
 */
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');

class AuthController {
  /**
   * POST /api/v1/auth/register
   */
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      return successResponse(res, 'Registration successful.', result, 201);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * POST /api/v1/auth/login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return successResponse(res, 'Login successful.', result);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/auth/me
   */
  async getMe(req, res) {
    try {
      const user = await authService.getMe(req.user.id);
      return successResponse(res, 'User profile retrieved.', user);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new AuthController();
