import api from './api';

const USE_MOCK = true;

const paymentService = {
  // POST /api/payments — body: { invoice_id, method }
  create: async (paymentData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      const transactionId = 'TRX-' + Date.now();
      return {
        payment_id: 'pay_' + Date.now(),
        transaction_id: transactionId,
        payment_url: 'https://sandbox-payment.com/pay/' + transactionId,
      };
    }

    // Backend: POST /api/payments → { message, data: { payment_id, transaction_id, payment_url } }
    const { data } = await api.post('/payments', {
      invoice_id: paymentData.invoice_id,
      method: paymentData.method,
    });
    return data.data;
  },

  // GET /api/payments/:id
  getById: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      return {
        id,
        status: 'paid',
        method: 'bank_transfer',
        amount: 25000,
        paid_at: new Date().toISOString(),
      };
    }

    // Backend: GET /api/payments/:id → { message, data }
    const { data } = await api.get(`/payments/${id}`);
    return data.data;
  },

  // POST /api/payments/callback — body: { transaction_id, status }
  callback: async (transactionId, status) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Payment callback success' };
    }

    // Backend: POST /api/payments/callback → { message }
    const { data } = await api.post('/payments/callback', {
      transaction_id: transactionId,
      status,
    });
    return data;
  },
};

export default paymentService;
