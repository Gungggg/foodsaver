import api from './api';
import { mockOrders } from '../utils/mockData';

const USE_MOCK = true;

const orderService = {
  // POST /api/orders — body: { bag_id, quantity }
  create: async (orderData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      return {
        order_id: 'ord_' + Date.now(),
        invoice_id: 'inv_' + Date.now(),
        total_amount: orderData.total_amount || 25000,
        pickup_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        qr_code: null,
      };
    }

    // Backend: POST /api/orders → { message, data: { order_id, invoice_id, total_amount, pickup_code, qr_code } }
    const { data } = await api.post('/orders', {
      bag_id: orderData.bag_id || orderData.product_id,
      quantity: orderData.quantity,
    });
    return data.data;
  },

  // GET /api/orders/my-orders
  getMyOrders: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return mockOrders;
    }

    // Backend: GET /api/orders/my-orders → { message, data: [...] }
    const { data } = await api.get('/orders/my-orders');
    return data.data;
  },

  // GET /api/orders/:id
  getById: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const order = mockOrders.find(o => o.id === id);
      if (!order) throw new Error('Order not found');
      return order;
    }

    // Backend: GET /api/orders/:id → { message, data }
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  },

  // POST /api/orders/:id/redeem — body: { pickup_code }
  redeemOrder: async (orderId, pickupCode) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        message: 'Order redeemed successfully',
        impact_log_id: 'imp_' + Date.now(),
        co2_saved: 2.5,
        money_saved: 25000,
      };
    }

    // Backend: POST /api/orders/:id/redeem → { message, data: { impact_log_id, co2_saved, money_saved } }
    const { data } = await api.post(`/orders/${orderId}/redeem`, {
      pickup_code: pickupCode,
    });
    return data.data || data;
  },

  // Alias for backward compatibility with frontend pages
  verifyPickup: async (pickupCode) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Pickup verified', orderId: 'ord_001' };
    }
    // Frontend perlu tahu order_id dulu sebelum redeem
    return { message: 'Use redeemOrder with orderId instead' };
  },

  // Alias for frontend compatibility
  getAll: async () => {
    return orderService.getMyOrders();
  },

  updateStatus: async (id, status) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Status updated' };
    }
    // Endpoint tidak tersedia di backend existing
    return { message: 'Not implemented' };
  },
};

export default orderService;
