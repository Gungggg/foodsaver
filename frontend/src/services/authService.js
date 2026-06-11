import api from './api';
import { mockUsers } from '../utils/mockData';

const USE_MOCK = true;

const authService = {
  login: async (email, password) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      let user;
      if (email.includes('admin')) user = mockUsers.admin;
      else if (email.includes('merchant') || email.includes('budi')) user = mockUsers.merchant;
      else user = mockUsers.customer;
      const token = 'mock_jwt_token_' + user.role + '_' + Date.now();
      return { user, token };
    }
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  register: async (userData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      const user = { ...mockUsers.customer, ...userData, id: 'usr_new_' + Date.now() };
      const token = 'mock_jwt_token_customer_' + Date.now();
      return { user, token };
    }
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  getMe: async () => {
    if (USE_MOCK) {
      const storedUser = localStorage.getItem('foodsaver_user');
      if (storedUser) return JSON.parse(storedUser);
      return null;
    }
    const { data } = await api.get('/auth/me');
    return data;
  },

  updateProfile: async (profileData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { ...mockUsers.customer, ...profileData };
    }
    const { data } = await api.put('/auth/profile', profileData);
    return data;
  },

  changePassword: async (passwords) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Password updated successfully' };
    }
    const { data } = await api.put('/auth/password', passwords);
    return data;
  },
};

export default authService;
