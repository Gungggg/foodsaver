/**
 * @fileoverview Product / marketplace routes.
 */
const { Router } = require('express');
const productController = require('../controllers/productController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { uploadProductPhoto } = require('../middleware/upload');
const { validateProduct } = require('../middleware/validate');

const router = Router();

// Public routes
router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

module.exports = router;
