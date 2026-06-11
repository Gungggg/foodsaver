/**
 * @fileoverview Admin routes (admin-only endpoints).
 */
const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = Router();

// All admin routes require auth + admin role
router.use(authenticateToken, authorizeRoles(['admin']));

// Merchant management
router.get('/merchants', adminController.listMerchants);
router.get('/merchants/:id', adminController.getMerchantDetails);
router.patch('/merchants/:id/verify', adminController.verifyMerchant);
router.patch('/merchants/:id/status', adminController.updateMerchantStatus);

// Transactions
router.get('/transactions', adminController.listTransactions);

// Complaints
router.get('/complaints', adminController.listComplaints);
router.patch('/complaints/:id', adminController.updateComplaint);

// Analytics
router.get('/analytics/overview', adminController.getOverviewAnalytics);
router.get('/analytics/impact', adminController.getImpactAnalytics);

module.exports = router;
