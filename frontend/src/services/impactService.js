import api from './api';

const USE_MOCK = true;

const impactService = {
  // GET /api/impact/stats
  getMyImpact: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        completed_orders: 12,
        co2_saved: 30.0,
        money_saved: 360000,
      };
    }

    // Backend: GET /api/impact/stats → { message, data: { completed_orders, co2_saved, money_saved } }
    const { data } = await api.get('/impact/stats');
    return data.data;
  },

  getPlatformImpact: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return {
        total_orders: 312,
        total_co2_saved: 780,
        total_money_saved: 9360000,
        total_food_saved: 1560,
      };
    }

    // Backend belum punya endpoint platform impact, fallback ke mock
    return {
      total_orders: 0,
      total_co2_saved: 0,
      total_money_saved: 0,
      total_food_saved: 0,
    };
  },
};

export default impactService;
