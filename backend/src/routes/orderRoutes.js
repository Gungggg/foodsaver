/**
 * @fileoverview Order routes (customer-facing).
 */
const { Router } = require('express');
const orderController = require('../controllers/orderController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validate');

const router = Router();

// All order routes require authentication
router.use(authenticateToken);

router.post('/', authorizeRoles(['customer']), validateOrder, orderController.createOrder);
router.get('/', authorizeRoles(['customer']), orderController.getCustomerOrders);
router.get('/:id', authorizeRoles(['customer']), orderController.getOrder);

module.exports = router;
