import api from './api';
import { mockMerchants } from '../utils/mockData';

const USE_MOCK = true;

const merchantService = {
  // GET /api/merchant/profile
  getProfile: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return mockMerchants?.[0] || {
        id: 'mp_001',
        store_name: 'Green Plate Resto',
        location: 'Jl. Sudirman No. 123, Jakarta',
        pickup_window: '18:00 - 20:00',
        is_verified: true,
      };
    }

    // Backend: GET /api/merchant/profile → { message, data }
    const { data } = await api.get('/merchant/profile');
    return data.data;
  },

  // POST /api/merchant/profile — body: { store_name, location, pickup_window }
  createProfile: async (profileData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      return { merchant_profile_id: 'mp_new_' + Date.now() };
    }

    // Backend: POST /api/merchant/profile → { message, data: { merchant_profile_id } }
    const { data } = await api.post('/merchant/profile', {
      store_name: profileData.store_name || profileData.business_name,
      location: profileData.location || profileData.address,
      pickup_window: profileData.pickup_window || '18:00 - 20:00',
    });
    return data.data;
  },

  // Alias for frontend compatibility (update = create if profile doesn't exist)
  updateProfile: async (profileData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { ...profileData, id: 'mp_001' };
    }
    // Backend tidak punya update, hanya create
    return merchantService.createProfile(profileData);
  },

  getAnalytics: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        total_products: 5,
        total_orders: 24,
        total_revenue: 1250000,
        monthly_orders: [4, 6, 8, 10, 12, 15],
      };
    }
    // Backend belum ada endpoint analytics merchant
    return { total_products: 0, total_orders: 0, total_revenue: 0 };
  },
};

export default merchantService;
