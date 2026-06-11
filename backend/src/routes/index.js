/**
 * @fileoverview Central route index – mounts all module routers under /api/v1.
 */
const { Router } = require('express');

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const paymentRoutes = require('./paymentRoutes');
const merchantRoutes = require('./merchantRoutes');
const adminRoutes = require('./adminRoutes');
const impactRoutes = require('./impactRoutes');

const router = Router();

// Mount module routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/merchant', merchantRoutes);
router.use('/admin', adminRoutes);
router.use('/impact', impactRoutes);

// API info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FoodSaver API v1',
    data: {
      endpoints: {
        auth: '/api/v1/auth',
        products: '/api/v1/products',
        orders: '/api/v1/orders',
        payments: '/api/v1/payments',
        merchant: '/api/v1/merchant',
        admin: '/api/v1/admin',
        impact: '/api/v1/impact',
      },
    },
  });
});

module.exports = router;
