import api from './api';
import { mockUsers } from '../utils/mockData';

const USE_MOCK = true;

// Helper: decode JWT payload (tanpa verifikasi, hanya extract data)
const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

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

    // Backend: POST /api/auth/login → { message, token }
    const { data } = await api.post('/auth/login', { email, password });
    const token = data.token;

    // Backend hanya return token, decode JWT untuk dapat user data
    const decoded = decodeJWT(token);
    const user = {
      id: decoded?.id,
      email: decoded?.email,
      role: decoded?.role,
      name: decoded?.email?.split('@')[0] || 'User', // Backend tidak kirim name di JWT
    };

    return { user, token };
  },

  register: async (userData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      const user = { ...mockUsers.customer, ...userData, id: 'usr_new_' + Date.now() };
      const token = 'mock_jwt_token_customer_' + Date.now();
      return { user, token };
    }

    // Backend: POST /api/auth/register → { message, data: { user_id } }
    await api.post('/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'customer',
    });

    // Backend tidak return token setelah register, auto-login
    const loginResult = await authService.login(userData.email, userData.password);
    return loginResult;
  },

  getMe: async () => {
    if (USE_MOCK) {
      const storedUser = localStorage.getItem('foodsaver_user');
      if (storedUser) return JSON.parse(storedUser);
      return null;
    }

    // Backend: GET /api/auth/profile → { message, data: { id, email, role } }
    const { data } = await api.get('/auth/profile');
    const userData = data.data;
    return {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      name: userData.name || userData.email?.split('@')[0] || 'User',
    };
  },

  updateProfile: async (profileData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { ...mockUsers.customer, ...profileData };
    }
    // Endpoint belum ada di backend, fallback
    const { data } = await api.put('/auth/profile', profileData);
    return data.data || data;
  },

  changePassword: async (passwords) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Password updated successfully' };
    }
    // Endpoint belum ada di backend, fallback
    const { data } = await api.put('/auth/password', passwords);
    return data;
  },
};

export default authService;
