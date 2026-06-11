/**
 * @fileoverview Auth routes.
 */
const { Router } = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validate');

const router = Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;
