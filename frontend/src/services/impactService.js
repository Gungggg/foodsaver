import api from './api';
import { mockImpact } from '../utils/mockData';

const USE_MOCK = true;

const impactService = {
  getMyImpact: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600));
      return mockImpact.customer;
    }
    const { data } = await api.get('/impact/my');
    return data;
  },

  getPlatformImpact: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      return mockImpact.platform;
    }
    const { data } = await api.get('/impact/platform');
    return data;
  },
};

export default impactService;
