import api from './api';
import { mockMerchants, mockOrders } from '../utils/mockData';

const USE_MOCK = true;

const adminService = {
  // GET /api/admin/dashboard
  getDashboard: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        total_users: 156,
        total_merchants: 23,
        total_products: 45,
        total_orders: 312,
        total_revenue: 15600000,
        total_co2_saved: 780,
      };
    }

    // Backend: GET /api/admin/dashboard → { message, data: { total_users, total_merchants, total_products, total_orders, total_revenue, total_co2_saved } }
    const { data } = await api.get('/admin/dashboard');
    return data.data;
  },

  // GET /api/admin/merchants
  getMerchants: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return mockMerchants || [];
    }

    // Backend: GET /api/admin/merchants → { message, total, data: [...] }
    const { data } = await api.get('/admin/merchants');
    return data.data;
  },

  // PATCH /api/admin/merchants/:id/verify
  verifyMerchant: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Merchant verified successfully' };
    }

    // Backend: PATCH /api/admin/merchants/:id/verify → { message }
    const { data } = await api.patch(`/admin/merchants/${id}/verify`);
    return data;
  },

  // === Fitur berikut belum ada di backend, tetap mock ===

  getPendingMerchants: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      const pending = (mockMerchants || []).filter(m => !m.is_verified);
      return pending;
    }

    // Bisa pakai getMerchants lalu filter di frontend
    const merchants = await adminService.getMerchants();
    return merchants.filter(m => !m.is_verified);
  },

  rejectMerchant: async (id, reason) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Merchant rejected' };
    }
    // Endpoint belum ada di backend
    return { message: 'Not implemented' };
  },

  updateMerchantStatus: async (id, status) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Status updated' };
    }
    // Endpoint belum ada di backend
    return { message: 'Not implemented' };
  },

  getComplaints: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return [
        { id: 'cmp_001', user_name: 'Sarah Johnson', subject: 'Order tidak sesuai', status: 'open', created_at: '2024-03-15T10:00:00Z' },
        { id: 'cmp_002', user_name: 'Ahmad Rizky', subject: 'Merchant tidak buka', status: 'resolved', created_at: '2024-03-14T08:00:00Z' },
      ];
    }
    // Endpoint belum ada di backend
    return [];
  },

  updateComplaint: async (id, updateData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Complaint updated' };
    }
    return { message: 'Not implemented' };
  },

  getAnalytics: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        revenue_chart: [1200000, 1400000, 1800000, 2100000, 2500000, 3000000],
        orders_chart: [30, 45, 55, 62, 78, 90],
        users_chart: [10, 18, 25, 34, 42, 50],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      };
    }
    // Bisa pakai data dari getDashboard
    const dashboard = await adminService.getDashboard();
    return { ...dashboard, revenue_chart: [], orders_chart: [], users_chart: [], months: [] };
  },
};

export default adminService;
