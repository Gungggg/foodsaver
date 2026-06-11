/**
 * @fileoverview Merchant service – profile management, documents, analytics.
 */
const { Op } = require('sequelize');
const db = require('../models');
const { Merchant, Document, User, Order, Product, Payment, ImpactLog } = db;

class MerchantService {
  /**
   * Get merchant profile by user ID.
   * @param {number} userId
   * @returns {Promise<Merchant>}
   */
  async getProfile(userId) {
    const merchant = await Merchant.findOne({
      where: { user_id: userId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Document, as: 'documents' },
      ],
    });

    if (!merchant) {
      const error = new Error('Merchant profile not found.');
      error.statusCode = 404;
      throw error;
    }

    return merchant;
  }

  /**
   * Update merchant profile.
   * @param {number} userId
   * @param {object} data
   * @param {string|null} logoUrl
   * @returns {Promise<Merchant>}
   */
  async updateProfile(userId, data, logoUrl = null) {
    const merchant = await Merchant.findOne({ where: { user_id: userId } });

    if (!merchant) {
      const error = new Error('Merchant profile not found.');
      error.statusCode = 404;
      throw error;
    }

    const updateData = {};
    if (data.store_name) updateData.store_name = data.store_name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.address) updateData.address = data.address;
    if (data.city) updateData.city = data.city;
    if (data.phone) updateData.phone = data.phone;
    if (data.operating_hours) updateData.operating_hours = data.operating_hours;
    if (data.category) updateData.category = data.category;
    if (logoUrl) updateData.logo_url = logoUrl;

    await merchant.update(updateData);
    return this.getProfile(userId);
  }

  /**
   * Upload a verification document.
   * @param {number} userId
   * @param {object} data - { type }
   * @param {string} fileUrl
   * @returns {Promise<Document>}
   */
  async uploadDocument(userId, data, fileUrl) {
    const merchant = await Merchant.findOne({ where: { user_id: userId } });

    if (!merchant) {
      const error = new Error('Merchant profile not found.');
      error.statusCode = 404;
      throw error;
    }

    const document = await Document.create({
      merchant_id: merchant.id,
      type: data.type,
      file_url: fileUrl,
      status: 'pending',
    });

    return document;
  }

  /**
   * Get merchant's documents.
   * @param {number} userId
   * @returns {Promise<Document[]>}
   */
  async getDocuments(userId) {
    const merchant = await Merchant.findOne({ where: { user_id: userId } });

    if (!merchant) {
      const error = new Error('Merchant profile not found.');
      error.statusCode = 404;
      throw error;
    }

    return Document.findAll({
      where: { merchant_id: merchant.id },
      order: [['created_at', 'DESC']],
    });
  }

  /**
   * Get merchant sales analytics.
   * @param {number} userId
   * @param {object} query - { start_date, end_date }
   * @returns {Promise<object>}
   */
  async getSalesAnalytics(userId, query) {
    const merchant = await Merchant.findOne({ where: { user_id: userId } });
    if (!merchant) {
      const error = new Error('Merchant profile not found.');
      error.statusCode = 404;
      throw error;
    }

    const where = { merchant_id: merchant.id };
    if (query.start_date && query.end_date) {
      where.created_at = { [Op.between]: [new Date(query.start_date), new Date(query.end_date)] };
    }

    const totalOrders = await Order.count({ where });
    const completedOrders = await Order.count({ where: { ...where, status: 'picked_up' } });
    const cancelledOrders = await Order.count({ where: { ...where, status: { [Op.in]: ['cancelled', 'expired'] } } });

    const revenue = await Order.sum('total_amount', {
      where: { ...where, status: 'picked_up' },
    });

    const totalProducts = await Product.count({ where: { merchant_id: merchant.id, is_active: true } });

    return {
      total_orders: totalOrders,
      completed_orders: completedOrders,
      cancelled_orders: cancelledOrders,
      pending_orders: totalOrders - completedOrders - cancelledOrders,
      total_revenue: revenue || 0,
      total_products: totalProducts,
      completion_rate: totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0,
    };
  }

  /**
   * Get merchant impact analytics.
   * @param {number} userId
   * @returns {Promise<object>}
   */
  async getImpactAnalytics(userId) {
    const merchant = await Merchant.findOne({ where: { user_id: userId } });
    if (!merchant) {
      const error = new Error('Merchant profile not found.');
      error.statusCode = 404;
      throw error;
    }

    const foodSaved = await ImpactLog.sum('food_saved_kg', { where: { merchant_id: merchant.id } });
    const co2Saved = await ImpactLog.sum('co2_saved_kg', { where: { merchant_id: merchant.id } });
    const moneySaved = await ImpactLog.sum('money_saved', { where: { merchant_id: merchant.id } });
    const totalPickups = await ImpactLog.count({ where: { merchant_id: merchant.id } });

    return {
      food_saved_kg: foodSaved || 0,
      co2_saved_kg: co2Saved || 0,
      money_saved: moneySaved || 0,
      total_pickups: totalPickups,
    };
  }
}

module.exports = new MerchantService();
