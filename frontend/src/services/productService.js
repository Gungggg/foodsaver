import api from './api';
import { mockProducts } from '../utils/mockData';

const USE_MOCK = true;

const productService = {
  getAll: async (params = {}) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600));
      let filtered = [...mockProducts];
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(p => p.category === params.category);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(s) || p.merchant_name.toLowerCase().includes(s)
        );
      }
      if (params.min_price) filtered = filtered.filter(p => p.discounted_price >= params.min_price);
      if (params.max_price) filtered = filtered.filter(p => p.discounted_price <= params.max_price);
      return { products: filtered, total: filtered.length };
    }
    const { data } = await api.get('/products', { params });
    return data;
  },

  getById: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 400));
      return mockProducts.find(p => p.id === id) || mockProducts[0];
    }
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  create: async (productData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { ...productData, id: 'prd_new_' + Date.now() };
    }
    const { data } = await api.post('/products', productData);
    return data;
  },

  update: async (id, productData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { ...productData, id };
    }
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
  },

  delete: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      return { message: 'Product deleted' };
    }
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  getMerchantProducts: async () => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return mockProducts.filter(p => p.merchant_id === 'mrc_001');
    }
    const { data } = await api.get('/merchant/products');
    return data;
  },
};

export default productService;
