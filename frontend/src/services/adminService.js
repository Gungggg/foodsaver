import api from './api';
import {
  mockAdminStats, mockMerchants, mockPendingVerifications,
  mockComplaints, mockMonthlyTrend, mockMerchantDistribution, mockTopMerchants,
} from '../utils/mockData';

const USE_MOCK = true;

const adminService = {
  getDashboardStats: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600));
      return {
        ...mockAdminStats,
        monthly_trend: mockMonthlyTrend,
      };
    }
    const { data } = await api.get('/admin/dashboard');
    return data;
  },

  getMerchants: async (params = {}) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      let filtered = [...mockMerchants];
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(m =>
          m.business_name.toLowerCase().includes(s) || m.owner_name.toLowerCase().includes(s)
        );
      }
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter(m => m.status === params.status);
      }
      return filtered;
    }
    const { data } = await api.get('/admin/merchants', { params });
    return data;
  },

  getPendingVerifications: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return mockPendingVerifications;
    }
    const { data } = await api.get('/admin/verifications');
    return data;
  },

  verifyMerchant: async (id, decision, reason) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      return { message: `Merchant ${decision}` };
    }
    const { data } = await api.post(`/admin/verifications/${id}`, { decision, reason });
    return data;
  },

  getComplaints: async (params = {}) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      let filtered = [...mockComplaints];
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter(c => c.status === params.status);
      }
      return filtered;
    }
    const { data } = await api.get('/admin/complaints', { params });
    return data;
  },

  updateComplaint: async (id, updateData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { id, ...updateData };
    }
    const { data } = await api.patch(`/admin/complaints/${id}`, updateData);
    return data;
  },

  getAnalytics: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 700));
      return {
        monthly_trend: mockMonthlyTrend,
        merchant_distribution: mockMerchantDistribution,
        top_merchants: mockTopMerchants,
        impact: {
          food_saved_kg: 15230,
          co2_prevented_kg: 38075,
          money_saved: 456900000,
          total_bags: 12450,
        },
      };
    }
    const { data } = await api.get('/admin/analytics');
    return data;
  },

  suspendMerchant: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Merchant suspended' };
    }
    const { data } = await api.patch(`/admin/merchants/${id}/suspend`);
    return data;
  },

  deleteMerchant: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Merchant deleted' };
    }
    const { data } = await api.delete(`/admin/merchants/${id}`);
    return data;
  },
};

export default adminService;
