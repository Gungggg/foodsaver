/**
 * @fileoverview Order service – reservation with atomic stock decrement, status management, QR verification.
 */
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const db = require('../models');
const { Order, Product, Merchant, Payment, Receipt, ImpactLog, User } = db;
const { generateQRCode } = require('../utils/qrcode');
const { calculateImpact } = require('../utils/impact');

class OrderService {
  /**
   * Reserve a bag – atomic stock decrement within a transaction.
   * Creates pending order with 15-minute payment expiry.
   * @param {number} customerId
   * @param {object} data - { product_id, quantity }
   * @returns {Promise<Order>}
   */
  async createOrder(customerId, data) {
    const { product_id, quantity } = data;

    const result = await db.sequelize.transaction(async (t) => {
      // Lock the product row for update
      const product = await Product.findByPk(product_id, {
        lock: t.LOCK.UPDATE,
        transaction: t,
        include: [{ model: Merchant, as: 'merchant' }],
      });

      if (!product) {
        const error = new Error('Product not found.');
        error.statusCode = 404;
        throw error;
      }

      if (!product.is_active) {
        const error = new Error('Product is no longer available.');
        error.statusCode = 400;
        throw error;
      }

      if (product.merchant.status !== 'approved') {
        const error = new Error('Merchant is not approved.');
        error.statusCode = 400;
        throw error;
      }

      if (product.current_stock < quantity) {
        const error = new Error(`Insufficient stock. Only ${product.current_stock} available.`);
        error.statusCode = 400;
        throw error;
      }

      // Atomic stock decrement
      await product.update(
        { current_stock: product.current_stock - quantity },
        { transaction: t }
      );

      // Generate order number and QR token
      const orderNumber = `FS-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const qrToken = uuidv4();

      // Calculate total
      const totalAmount = parseFloat(product.discounted_price) * quantity;

      // Pickup deadline: end of today's pickup window or 15 min from now for payment
      const now = new Date();
      const pickupDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // tomorrow

      const order = await Order.create({
        order_number: orderNumber,
        customer_id: customerId,
        product_id: product.id,
        merchant_id: product.merchant_id,
        quantity,
        total_amount: totalAmount,
        status: 'pending',
        qr_token: qrToken,
        pickup_deadline: pickupDeadline,
      }, { transaction: t });

      // Generate QR code image
      const qrCodeUrl = await generateQRCode(qrToken, `order-${order.id}`);

      // Create receipt
      await Receipt.create({
        order_id: order.id,
        receipt_number: `RCP-${orderNumber}`,
        receipt_data: {
          order_number: orderNumber,
          product_title: product.title,
          merchant_name: product.merchant.store_name,
          quantity,
          unit_price: parseFloat(product.discounted_price),
          total_amount: totalAmount,
          pickup_start: product.pickup_start,
          pickup_end: product.pickup_end,
        },
        qr_code_url: qrCodeUrl,
      }, { transaction: t });

      return order;
    });

    // Return order with associations
    return this.getOrderById(result.id, result.customer_id);
  }

  /**
   * Get customer's orders with pagination.
   * @param {number} customerId
   * @param {object} query
   * @returns {Promise<{ rows: Order[], count: number }>}
   */
  async getCustomerOrders(customerId, query) {
    const { page = 1, limit = 10, status } = query;
    const offset = (page - 1) * limit;
    const where = { customer_id: customerId };
    if (status) where.status = status;

    const { rows, count } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'title', 'photo_url', 'category', 'pickup_start', 'pickup_end'],
        },
        {
          model: Merchant,
          as: 'merchant',
          attributes: ['id', 'store_name', 'address', 'city'],
        },
        { model: Payment, as: 'payment' },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return { rows, count, page: parseInt(page, 10), limit: parseInt(limit, 10) };
  }

  /**
   * Get single order with full details.
   * @param {number} orderId
   * @param {number} userId
   * @returns {Promise<Order>}
   */
  async getOrderById(orderId, userId) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'title', 'description', 'photo_url', 'category', 'original_price', 'discounted_price', 'pickup_start', 'pickup_end', 'estimated_weight_kg'],
        },
        {
          model: Merchant,
          as: 'merchant',
          attributes: ['id', 'store_name', 'address', 'city', 'phone'],
        },
        { model: Payment, as: 'payment' },
        { model: Receipt, as: 'receipt' },
        { model: ImpactLog, as: 'impactLog' },
      ],
    });

    if (!order) {
      const error = new Error('Order not found.');
      error.statusCode = 404;
      throw error;
    }

    return order;
  }

  /**
   * Get merchant's orders with pagination.
   * @param {number} merchantId
   * @param {object} query
   * @returns {Promise<{ rows: Order[], count: number }>}
   */
  async getMerchantOrders(merchantId, query) {
    const { page = 1, limit = 10, status } = query;
    const offset = (page - 1) * limit;
    const where = { merchant_id: merchantId };
    if (status) where.status = status;

    const { rows, count } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'name', 'email', 'phone'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'title', 'photo_url'],
        },
        { model: Payment, as: 'payment' },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    return { rows, count, page: parseInt(page, 10), limit: parseInt(limit, 10) };
  }

  /**
   * Verify pickup via QR token (merchant scans customer QR code).
   * @param {number} orderId
   * @param {number} merchantId
   * @param {string} qrToken
   * @returns {Promise<Order>}
   */
  async verifyPickup(orderId, merchantId, qrToken) {
    const order = await Order.findOne({
      where: { id: orderId, merchant_id: merchantId },
      include: [
        { model: Product, as: 'product' },
        { model: Merchant, as: 'merchant' },
      ],
    });

    if (!order) {
      const error = new Error('Order not found.');
      error.statusCode = 404;
      throw error;
    }

    if (order.status !== 'confirmed') {
      const error = new Error(`Order cannot be picked up. Current status: ${order.status}`);
      error.statusCode = 400;
      throw error;
    }

    if (order.qr_token !== qrToken) {
      const error = new Error('Invalid QR code.');
      error.statusCode = 400;
      throw error;
    }

    // Mark as picked up
    await order.update({
      status: 'picked_up',
      picked_up_at: new Date(),
    });

    // Create impact log
    const impact = calculateImpact({
      category: order.product.category,
      weightKg: parseFloat(order.product.estimated_weight_kg),
      quantity: order.quantity,
      originalPrice: parseFloat(order.product.original_price),
      discountedPrice: parseFloat(order.product.discounted_price),
    });

    await ImpactLog.create({
      order_id: order.id,
      customer_id: order.customer_id,
      merchant_id: order.merchant_id,
      food_saved_kg: impact.foodSavedKg,
      co2_saved_kg: impact.co2SavedKg,
      money_saved: impact.moneySaved,
    });

    return order;
  }
}

module.exports = new OrderService();
