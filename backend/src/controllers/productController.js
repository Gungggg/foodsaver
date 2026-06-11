/**
 * @fileoverview Product controller – handles marketplace CRUD operations.
 */
const productService = require('../services/productService');
const { Merchant } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

class ProductController {
  /**
   * GET /api/v1/products
   */
  async listProducts(req, res) {
    try {
      const result = await productService.listProducts(req.query);
      return paginatedResponse(res, 'Products retrieved.', result.rows, {
        page: result.page,
        limit: result.limit,
        total: result.count,
      });
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * GET /api/v1/products/:id
   */
  async getProduct(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      return successResponse(res, 'Product details retrieved.', product);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * POST /api/v1/merchant/products
   */
  async createProduct(req, res) {
    try {
      const merchant = await Merchant.findOne({ where: { user_id: req.user.id } });
      if (!merchant) return errorResponse(res, 'Merchant profile not found.', 404);
      if (merchant.status !== 'approved') return errorResponse(res, 'Merchant not yet approved.', 403);

      const photoUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
      const product = await productService.createProduct(merchant.id, req.body, photoUrl);
      return successResponse(res, 'Product created successfully.', product, 201);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PUT /api/v1/merchant/products/:id
   */
  async updateProduct(req, res) {
    try {
      const merchant = await Merchant.findOne({ where: { user_id: req.user.id } });
      if (!merchant) return errorResponse(res, 'Merchant profile not found.', 404);

      const photoUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
      const product = await productService.updateProduct(req.params.id, merchant.id, req.body, photoUrl);
      return successResponse(res, 'Product updated successfully.', product);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * DELETE /api/v1/merchant/products/:id
   */
  async deleteProduct(req, res) {
    try {
      const merchant = await Merchant.findOne({ where: { user_id: req.user.id } });
      if (!merchant) return errorResponse(res, 'Merchant profile not found.', 404);

      await productService.deleteProduct(req.params.id, merchant.id);
      return successResponse(res, 'Product deleted successfully.');
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }

  /**
   * PATCH /api/v1/merchant/products/:id/stock
   */
  async updateStock(req, res) {
    try {
      const merchant = await Merchant.findOne({ where: { user_id: req.user.id } });
      if (!merchant) return errorResponse(res, 'Merchant profile not found.', 404);

      const { current_stock } = req.body;
      if (current_stock === undefined || isNaN(current_stock) || current_stock < 0) {
        return errorResponse(res, 'Valid current_stock value is required.', 422);
      }

      const product = await productService.updateStock(req.params.id, merchant.id, current_stock);
      return successResponse(res, 'Stock updated successfully.', product);
    } catch (error) {
      return errorResponse(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new ProductController();
