import api from './api';
import { mockProducts } from '../utils/mockData';

const USE_MOCK = true;

const productService = {
  // GET /api/products?search=&min_price=&max_price=&in_stock=&merchant=&page=&limit=
  getAll: async (params = {}) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      let products = [...mockProducts];
      if (params.search) {
        products = products.filter(p =>
          p.name.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      if (params.category) {
        products = products.filter(p => p.category === params.category);
      }
      return { data: products, pagination: { current_page: 1, total_pages: 1, total_data: products.length } };
    }

    // Backend: GET /api/products → { message, pagination, data }
    const { data } = await api.get('/products', { params });
    return { data: data.data, pagination: data.pagination };
  },

  getById: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      const product = mockProducts.find(p => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    }

    // Backend: GET /api/products/:id → { message, data }
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },

  create: async (productData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 800));
      return { id: 'prod_new_' + Date.now(), ...productData };
    }

    // Backend: POST /api/products (multipart/form-data) → { message, data: { product_id } }
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const { data } = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  update: async (id, productData) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { id, ...productData };
    }

    // Backend hanya punya updateStock (PATCH /products/:id/stock)
    // Untuk update lainnya, pakai endpoint yang sama
    const { data } = await api.patch(`/products/${id}/stock`, productData);
    return data;
  },

  updateStock: async (id, stock) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      return { message: 'Stock updated' };
    }

    // Backend: PATCH /api/products/:id/stock → { message }
    const { data } = await api.patch(`/products/${id}/stock`, { stock });
    return data;
  },

  delete: async (id) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return { message: 'Product deleted' };
    }

    // Backend: DELETE /api/products/:id → { message }
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  getByMerchant: async (merchantId) => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 500));
      return mockProducts.filter(p => p.merchant_id === merchantId);
    }

    const { data } = await api.get('/products', { params: { merchant: merchantId } });
    return data.data;
  },
};

export default productService;
