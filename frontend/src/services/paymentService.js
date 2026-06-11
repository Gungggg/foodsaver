import api from './api';

const USE_MOCK = true;

const paymentService = {
  createPayment: async (orderId) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 1000));
      return {
        payment_url: '#',
        token: 'mock_snap_token_' + Date.now(),
        order_id: orderId,
      };
    }
    const { data } = await api.post('/payments/create', { order_id: orderId });
    return data;
  },

  checkStatus: async (orderId) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { status: 'paid', payment_method: 'gopay' };
    }
    const { data } = await api.get(`/payments/status/${orderId}`);
    return data;
  },
};

export default paymentService;
