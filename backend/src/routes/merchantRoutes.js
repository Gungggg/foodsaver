/**
 * @fileoverview Merchant routes (merchant-only endpoints).
 */
const { Router } = require('express');
const merchantController = require('../controllers/merchantController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { uploadMerchantLogo, uploadDocument, uploadProductPhoto } = require('../middleware/upload');
const { validateProduct, validateMerchantProfile } = require('../middleware/validate');

const router = Router();

// All merchant routes require auth + merchant role
router.use(authenticateToken, authorizeRoles(['merchant']));

// Profile
router.get('/profile', merchantController.getProfile);
router.put('/profile', uploadMerchantLogo, validateMerchantProfile, merchantController.updateProfile);

// Documents
router.post('/documents', uploadDocument, merchantController.uploadDocument);
router.get('/documents', merchantController.getDocuments);

// Products (merchant CRUD)
router.post('/products', uploadProductPhoto, validateProduct, productController.createProduct);
router.put('/products/:id', uploadProductPhoto, productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/products/:id/stock', productController.updateStock);

// Orders (merchant view)
router.get('/orders', orderController.getMerchantOrders);
router.patch('/orders/:id/verify', orderController.verifyPickup);

// Analytics
router.get('/analytics/sales', merchantController.getSalesAnalytics);
router.get('/analytics/impact', merchantController.getImpactAnalytics);

module.exports = router;
