/**
 * @fileoverview Impact routes.
 */
const { Router } = require('express');
const impactController = require('../controllers/impactController');
const { authenticateToken } = require('../middleware/auth');

const router = Router();

// Public route
router.get('/platform', impactController.getPlatformImpact);

// Authenticated route
router.get('/me', authenticateToken, impactController.getCustomerImpact);

module.exports = router;
