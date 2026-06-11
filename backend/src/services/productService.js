/**
 * @fileoverview Product service – CRUD, search, filtering, stock management.
 */
const { Op } = require('sequelize');
const { Product, Merchant } = require('../models');

class ProductService {
  /**
   * List products with pagination, search, and filtering.
   * @param {object} query - Query parameters
   * @returns {Promise<{ rows: Product[], count: number }>}
   */
  async listProducts(query) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      city,
      min_price,
      max_price,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = query;

    const offset = (page - 1) * limit;
    const where = { is_active: true };
    const merchantWhere = { status: 'approved' };

    // Search by keyword (title or description)
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by price range
    if (min_price) {
      where.discounted_price = { ...where.discounted_price, [Op.gte]: min_price };
    }
    if (max_price) {
      where.discounted_price = { ...where.discounted_price, [Op.lte]: max_price };
    }

    // Filter by city (via merchant)
    if (city) {
      merchantWhere.city = { [Op.like]: `%${city}%` };
    }

    // Only show products with stock > 0
    where.current_stock = { [Op.gt]: 0 };

    const allowedSorts = ['created_at', 'discounted_price', 'title'];
    const orderField = allowedSorts.includes(sort_by) ? sort_by : 'created_at';
    const orderDir = sort_order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { rows, count } = await Product.findAndCountAll({
      where,
      include: [{
        model: Merchant,
        as: 'merchant',
        where: merchantWhere,
        attributes: ['id', 'store_name', 'city', 'address', 'logo_url', 'category'],
      }],
      order: [[orderField, orderDir]],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return { rows, count, page: parseInt(page, 10), limit: parseInt(limit, 10) };
  }

  /**
   * Get product by ID with full merchant info.
   * @param {number} id
   * @returns {Promise<Product>}
   */
  async getProductById(id) {
    const product = await Product.findByPk(id, {
      include: [{
        model: Merchant,
        as: 'merchant',
        attributes: ['id', 'store_name', 'description', 'city', 'address', 'phone', 'logo_url', 'category', 'operating_hours'],
      }],
    });

    if (!product) {
      const error = new Error('Product not found.');
      error.statusCode = 404;
      throw error;
    }

    return product;
  }

  /**
   * Create a new product (merchant only).
   * @param {number} merchantId
   * @param {object} data
   * @param {string|null} photoUrl
   * @returns {Promise<Product>}
   */
  async createProduct(merchantId, data, photoUrl = null) {
    const product = await Product.create({
      merchant_id: merchantId,
      title: data.title,
      description: data.description || null,
      category: data.category,
      original_price: data.original_price,
      discounted_price: data.discounted_price,
      daily_stock: data.daily_stock,
      current_stock: data.current_stock || data.daily_stock,
      pickup_start: data.pickup_start,
      pickup_end: data.pickup_end,
      photo_url: photoUrl,
      estimated_weight_kg: data.estimated_weight_kg || 0.5,
      is_active: data.is_active !== undefined ? data.is_active : true,
    });

    return product;
  }

  /**
   * Update a product.
   * @param {number} productId
   * @param {number} merchantId
   * @param {object} data
   * @param {string|null} photoUrl
   * @returns {Promise<Product>}
   */
  async updateProduct(productId, merchantId, data, photoUrl = null) {
    const product = await Product.findOne({ where: { id: productId, merchant_id: merchantId } });

    if (!product) {
      const error = new Error('Product not found or access denied.');
      error.statusCode = 404;
      throw error;
    }

    const updateData = { ...data };
    if (photoUrl) updateData.photo_url = photoUrl;

    await product.update(updateData);
    return product;
  }

  /**
   * Delete a product (soft delete by deactivating).
   * @param {number} productId
   * @param {number} merchantId
   * @returns {Promise<void>}
   */
  async deleteProduct(productId, merchantId) {
    const product = await Product.findOne({ where: { id: productId, merchant_id: merchantId } });

    if (!product) {
      const error = new Error('Product not found or access denied.');
      error.statusCode = 404;
      throw error;
    }

    await product.update({ is_active: false });
  }

  /**
   * Update product stock.
   * @param {number} productId
   * @param {number} merchantId
   * @param {number} stock
   * @returns {Promise<Product>}
   */
  async updateStock(productId, merchantId, stock) {
    const product = await Product.findOne({ where: { id: productId, merchant_id: merchantId } });

    if (!product) {
      const error = new Error('Product not found or access denied.');
      error.statusCode = 404;
      throw error;
    }

    await product.update({ current_stock: stock });
    return product;
  }
}

module.exports = new ProductService();
