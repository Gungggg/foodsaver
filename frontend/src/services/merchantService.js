import api from './api';
import { mockMerchants, mockWeeklyRevenue, mockMerchantOrders } from '../utils/mockData';

const USE_MOCK = true;

const merchantService = {
  getProfile: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      return mockMerchants[0];
    }
    const { data } = await api.get('/merchant/profile');
    return data;
  },

  updateProfile: async (profileData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { ...mockMerchants[0], ...profileData };
    }
    const { data } = await api.put('/merchant/profile', profileData);
    return data;
  },

  getDashboardStats: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        today_orders: 12,
        today_revenue: 1680000,
        active_bags: 5,
        total_customers: 156,
        weekly_revenue: mockWeeklyRevenue,
        recent_orders: mockMerchantOrders.slice(0, 3),
        food_saved_kg: 245,
        co2_prevented_kg: 612,
      };
    }
    const { data } = await api.get('/merchant/dashboard');
    return data;
  },
};

export default merchantService;
