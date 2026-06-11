/**
 * @fileoverview Payment service – Midtrans Snap integration, callback handling.
 * Uses a simplified Midtrans integration (direct HTTP calls to Snap API).
 */
const crypto = require('crypto');
const { Payment, Order, Product, Merchant } = require('../models');

class PaymentService {
  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    this.baseUrl = this.isProduction
      ? 'https://app.midtrans.com/snap/v1'
      : 'https://app.sandbox.midtrans.com/snap/v1';
  }

  /**
   * Initiate payment for an order via Midtrans Snap.
   * @param {number} orderId
   * @param {number} userId
   * @returns {Promise<{ payment: Payment, snapToken: string, redirectUrl: string }>}
   */
  async createCharge(orderId, userId) {
    const order = await Order.findOne({
      where: { id: orderId, customer_id: userId },
      include: [
        { model: Product, as: 'product' },
        { model: Merchant, as: 'merchant' },
        { model: Payment, as: 'payment' },
      ],
    });

    if (!order) {
      const error = new Error('Order not found.');
      error.statusCode = 404;
      throw error;
    }

    if (order.status !== 'pending') {
      const error = new Error(`Cannot pay for order with status: ${order.status}`);
      error.statusCode = 400;
      throw error;
    }

    // If payment already exists and is pending, return existing
    if (order.payment && order.payment.status === 'pending') {
      return {
        payment: order.payment,
        snapToken: order.payment.gateway_ref || 'demo-snap-token',
        redirectUrl: `${this.baseUrl}/transactions/${order.payment.gateway_ref || 'demo'}`,
      };
    }

    // Create Midtrans Snap transaction (simulated for development)
    const gatewayRef = `SNAP-${order.order_number}-${Date.now()}`;

    // In production, you would call Midtrans API here:
    // const snapResponse = await this.callMidtransSnap(order);

    const payment = await Payment.create({
      order_id: order.id,
      gateway_ref: gatewayRef,
      payment_method: 'midtrans_snap',
      amount: order.total_amount,
      status: 'pending',
    });

    return {
      payment,
      snapToken: gatewayRef,
      redirectUrl: `${this.baseUrl}/transactions/${gatewayRef}`,
    };
  }

  /**
   * Handle Midtrans webhook notification.
   * @param {object} notification - Webhook payload from Midtrans
   * @returns {Promise<Payment>}
   */
  async handleCallback(notification) {
    const {
      order_id: orderNumber,
      transaction_status: transactionStatus,
      fraud_status: fraudStatus,
      payment_type: paymentType,
      signature_key: signatureKey,
      gross_amount: grossAmount,
      status_code: statusCode,
    } = notification;

    // Verify signature (Midtrans uses SHA512(order_id + status_code + gross_amount + serverKey))
    if (this.serverKey) {
      const expectedSig = crypto
        .createHash('sha512')
        .update(`${orderNumber}${statusCode}${grossAmount}${this.serverKey}`)
        .digest('hex');

      if (signatureKey && signatureKey !== expectedSig) {
        const error = new Error('Invalid signature.');
        error.statusCode = 403;
        throw error;
      }
    }

    // Find the order by order_number
    const order = await Order.findOne({ where: { order_number: orderNumber } });
    if (!order) {
      const error = new Error('Order not found for callback.');
      error.statusCode = 404;
      throw error;
    }

    const payment = await Payment.findOne({ where: { order_id: order.id } });
    if (!payment) {
      const error = new Error('Payment record not found.');
      error.statusCode = 404;
      throw error;
    }

    // Determine payment status
    let paymentStatus = 'pending';
    let orderStatus = order.status;

    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      if (fraudStatus === 'accept' || !fraudStatus) {
        paymentStatus = 'success';
        orderStatus = 'confirmed';
      } else {
        paymentStatus = 'failed';
        orderStatus = 'cancelled';
      }
    } else if (transactionStatus === 'deny' || transactionStatus === 'cancel') {
      paymentStatus = 'failed';
      orderStatus = 'cancelled';
    } else if (transactionStatus === 'expire') {
      paymentStatus = 'expired';
      orderStatus = 'expired';
    } else if (transactionStatus === 'pending') {
      paymentStatus = 'pending';
    }

    // Update payment
    await payment.update({
      status: paymentStatus,
      payment_method: paymentType || payment.payment_method,
      gateway_response: notification,
      paid_at: paymentStatus === 'success' ? new Date() : null,
    });

    // Update order status
    if (orderStatus !== order.status) {
      await order.update({ status: orderStatus });

      // If cancelled/expired, restore stock
      if (['cancelled', 'expired'].includes(orderStatus)) {
        await Product.increment('current_stock', {
          by: order.quantity,
          where: { id: order.product_id },
        });
      }
    }

    return payment;
  }

  /**
   * Check payment status for an order.
   * @param {number} orderId
   * @param {number} userId
   * @returns {Promise<Payment>}
   */
  async getPaymentStatus(orderId, userId) {
    const order = await Order.findOne({
      where: { id: orderId, customer_id: userId },
    });

    if (!order) {
      const error = new Error('Order not found.');
      error.statusCode = 404;
      throw error;
    }

    const payment = await Payment.findOne({
      where: { order_id: order.id },
      include: [{
        model: Order,
        as: 'order',
        attributes: ['id', 'order_number', 'status', 'total_amount'],
      }],
    });

    if (!payment) {
      const error = new Error('Payment not found.');
      error.statusCode = 404;
      throw error;
    }

    return payment;
  }
}

module.exports = new PaymentService();
