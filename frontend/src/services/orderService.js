import api from './api';
import { mockOrders, mockMerchantOrders } from '../utils/mockData';

const USE_MOCK = true;

const orderService = {
  create: async (orderData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      return {
        id: 'ord_new_' + Date.now(),
        order_number: 'FS-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(Math.random() * 999),
        ...orderData,
        status: 'pending',
        pickup_code: 'FSV-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        created_at: new Date().toISOString(),
      };
    }
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  getMyOrders: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600));
      return mockOrders;
    }
    const { data } = await api.get('/orders/my');
    return data;
  },

  getMerchantOrders: async (params = {}) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600));
      let filtered = [...mockMerchantOrders];
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter(o => o.status === params.status);
      }
      return filtered;
    }
    const { data } = await api.get('/merchant/orders', { params });
    return data;
  },

  getById: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      return mockOrders.find(o => o.id === id) || mockOrders[0];
    }
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  updateStatus: async (id, status) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { id, status };
    }
    const { data } = await api.patch(`/orders/${id}/status`, { status });
    return data;
  },

  verifyPickup: async (pickupCode) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      const order = [...mockMerchantOrders, ...mockOrders].find(o => o.pickup_code === pickupCode);
      if (order) return { success: true, order };
      return { success: false, message: 'Invalid pickup code' };
    }
    const { data } = await api.post('/orders/verify-pickup', { pickup_code: pickupCode });
    return data;
  },
};

export default orderService;
