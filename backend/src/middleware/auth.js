/**
 * @fileoverview Authentication and authorization middleware.
 */
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { errorResponse } = require('../utils/response');

/**
 * Verify JWT token from Authorization header.
 * Attaches decoded user payload to req.user.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 'Access denied. No token provided.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token has expired.', 401);
    }
    return errorResponse(res, 'Invalid token.', 401);
  }
};

/**
 * Role-based access control middleware factory.
 * @param {string[]} roles - Allowed roles
 * @returns {import('express').RequestHandler}
 */
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'You do not have permission to perform this action.', 403);
    }

    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
