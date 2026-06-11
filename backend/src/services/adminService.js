/**
 * @fileoverview Admin service – merchant verification, user management, platform analytics.
 */
const { Op } = require('sequelize');
const db = require('../models');
const { User, Merchant, Document, Order, Payment, Complaint, Product, ImpactLog } = db;

class AdminService {
  /**
   * List merchants with filtering and pagination.
   * @param {object} query
   * @returns {Promise<{ rows: Merchant[], count: number }>}
   */
  async listMerchants(query) {
    const { page = 1, limit = 10, status, city, search } = query;
    const offset = (page - 1) * limit;
    const where = {};

    if (status) where.status = status;
    if (city) where.city = { [Op.like]: `%${city}%` };
    if (search) {
      where[Op.or] = [
        { store_name: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await Merchant.findAndCountAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return { rows, count, page: parseInt(page, 10), limit: parseInt(limit, 10) };
  }

  /**
   * Get merchant details with documents.
   * @param {number} merchantId
   * @returns {Promise<Merchant>}
   */
  async getMerchantDetails(merchantId) {
    const merchant = await Merchant.findByPk(merchantId, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Document, as: 'documents' },
        { model: Product, as: 'products', where: { is_active: true }, required: false },
      ],
    });

    if (!merchant) {
      const error = new Error('Merchant not found.');
      error.statusCode = 404;
      throw error;
    }

    return merchant;
  }

  /**
   * Approve or reject a merchant.
   * @param {number} merchantId
   * @param {object} data - { action: 'approve' | 'reject', reason?: string }
   * @returns {Promise<Merchant>}
   */
  async verifyMerchant(merchantId, data) {
    const merchant = await Merchant.findByPk(merchantId);

    if (!merchant) {
      const error = new Error('Merchant not found.');
      error.statusCode = 404;
      throw error;
    }

    if (data.action === 'approve') {
      await merchant.update({
        status: 'approved',
        verified_at: new Date(),
      });
    } else if (data.action === 'reject') {
      await merchant.update({
        status: 'rejected',
      });
    } else {
      const error = new Error('Action must be "approve" or "reject".');
      error.statusCode = 400;
      throw error;
    }

    return merchant;
  }

  /**
   * Suspend or activate a merchant.
   * @param {number} merchantId
   * @param {object} data - { action: 'suspend' | 'activate' }
   * @returns {Promise<Merchant>}
   */
  async updateMerchantStatus(merchantId, data) {
    const merchant = await Merchant.findByPk(merchantId);

    if (!merchant) {
      const error = new Error('Merchant not found.');
      error.statusCode = 404;
      throw error;
    }

    if (data.action === 'suspend') {
      await merchant.update({ status: 'suspended' });
    } else if (data.action === 'activate') {
      await merchant.update({ status: 'approved', verified_at: merchant.verified_at || new Date() });
    } else {
      const error = new Error('Action must be "suspend" or "activate".');
      error.statusCode = 400;
      throw error;
    }

    return merchant;
  }

  /**
   * List all transactions with pagination.
   * @param {object} query
   * @returns {Promise<{ rows: Payment[], count: number }>}
   */
  async listTransactions(query) {
    const { page = 1, limit = 10, status } = query;
    const offset = (page - 1) * limit;
    const where = {};
    if (status) where.status = status;

    const { rows, count } = await Payment.findAndCountAll({
      where,
      include: [{
        model: Order,
        as: 'order',
        attributes: ['id', 'order_number', 'customer_id', 'merchant_id', 'total_amount', 'status'],
        include: [
          { model: User, as: 'customer', attributes: ['id', 'name', 'email'] },
          { model: Merchant, as: 'merchant', attributes: ['id', 'store_name'] },
        ],
      }],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return { rows, count, page: parseInt(page, 10), limit: parseInt(limit, 10) };
  }

  /**
   * List complaints with pagination.
   * @param {object} query
   * @returns {Promise<{ rows: Complaint[], count: number }>}
   */
  async listComplaints(query) {
    const { page = 1, limit = 10, status } = query;
    const offset = (page - 1) * limit;
    const where = {};
    if (status) where.status = status;

    const { rows, count } = await Complaint.findAndCountAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'order_number'],
          required: false,
        },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return { rows, count, page: parseInt(page, 10), limit: parseInt(limit, 10) };
  }

  /**
   * Update complaint (assign, change status, add resolution notes).
   * @param {number} complaintId
   * @param {number} adminId
   * @param {object} data
   * @returns {Promise<Complaint>}
   */
  async updateComplaint(complaintId, adminId, data) {
    const complaint = await Complaint.findByPk(complaintId);

    if (!complaint) {
      const error = new Error('Complaint not found.');
      error.statusCode = 404;
      throw error;
    }

    const updateData = {};
    if (data.status) updateData.status = data.status;
    if (data.resolution_notes) updateData.resolution_notes = data.resolution_notes;
    updateData.assigned_admin_id = adminId;

    if (data.status === 'resolved') {
      updateData.resolved_at = new Date();
    }

    await complaint.update(updateData);
    return complaint;
  }

  /**
   * Platform overview analytics.
   * @returns {Promise<object>}
   */
  async getOverviewAnalytics() {
    const totalUsers = await User.count();
    const totalCustomers = await User.count({ where: { role: 'customer' } });
    const totalMerchants = await Merchant.count();
    const approvedMerchants = await Merchant.count({ where: { status: 'approved' } });
    const pendingMerchants = await Merchant.count({ where: { status: 'pending' } });
    const totalOrders = await Order.count();
    const completedOrders = await Order.count({ where: { status: 'picked_up' } });
    const totalRevenue = await Order.sum('total_amount', { where: { status: 'picked_up' } });
    const totalProducts = await Product.count({ where: { is_active: true } });
    const openComplaints = await Complaint.count({ where: { status: { [Op.in]: ['open', 'in_progress'] } } });

    return {
      total_users: totalUsers,
      total_customers: totalCustomers,
      total_merchants: totalMerchants,
      approved_merchants: approvedMerchants,
      pending_merchants: pendingMerchants,
      total_orders: totalOrders,
      completed_orders: completedOrders,
      total_revenue: totalRevenue || 0,
      total_products: totalProducts,
      open_complaints: openComplaints,
    };
  }

  /**
   * Platform impact analytics.
   * @returns {Promise<object>}
   */
  async getImpactAnalytics() {
    const foodSaved = await ImpactLog.sum('food_saved_kg');
    const co2Saved = await ImpactLog.sum('co2_saved_kg');
    const moneySaved = await ImpactLog.sum('money_saved');
    const totalPickups = await ImpactLog.count();

    return {
      food_saved_kg: foodSaved || 0,
      co2_saved_kg: co2Saved || 0,
      money_saved: moneySaved || 0,
      total_pickups: totalPickups,
      trees_equivalent: co2Saved ? parseFloat((co2Saved / 21.77).toFixed(1)) : 0,
    };
  }
}

module.exports = new AdminService();
