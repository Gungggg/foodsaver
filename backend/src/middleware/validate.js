/**
 * @fileoverview Request validation middleware.
 * Simple, dependency-free validators for each module.
 */
const { errorResponse } = require('../utils/response');

/**
 * Generic validation middleware factory.
 * Takes a validation function and returns Express middleware.
 * The validator should return an array of error strings (empty = valid).
 * @param {(body: object) => string[]} validatorFn
 * @returns {import('express').RequestHandler}
 */
const validate = (validatorFn) => {
  return (req, res, next) => {
    const errors = validatorFn(req.body, req);
    if (errors.length > 0) {
      return errorResponse(res, 'Validation failed', 422, errors);
    }
    next();
  };
};

// ===================== AUTH VALIDATORS =====================

const validateRegister = validate((body) => {
  const errors = [];
  if (!body.name || body.name.trim().length < 2) errors.push('Name is required (min 2 chars).');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Valid email is required.');
  if (!body.password || body.password.length < 6) errors.push('Password must be at least 6 characters.');
  if (!body.role || !['customer', 'merchant'].includes(body.role)) errors.push('Role must be customer or merchant.');
  if (body.role === 'merchant') {
    if (!body.store_name || body.store_name.trim().length < 2) errors.push('Store name is required for merchants.');
    if (!body.address) errors.push('Address is required for merchants.');
    if (!body.city) errors.push('City is required for merchants.');
  }
  return errors;
});

const validateLogin = validate((body) => {
  const errors = [];
  if (!body.email) errors.push('Email is required.');
  if (!body.password) errors.push('Password is required.');
  return errors;
});

// ===================== PRODUCT VALIDATORS =====================

const validateProduct = validate((body) => {
  const errors = [];
  if (!body.title || body.title.trim().length < 3) errors.push('Title is required (min 3 chars).');
  if (!body.original_price || isNaN(body.original_price) || body.original_price <= 0) errors.push('Valid original price is required.');
  if (!body.discounted_price || isNaN(body.discounted_price) || body.discounted_price <= 0) errors.push('Valid discounted price is required.');
  if (Number(body.discounted_price) >= Number(body.original_price)) errors.push('Discounted price must be less than original price.');
  if (!body.daily_stock || isNaN(body.daily_stock) || body.daily_stock < 1) errors.push('Daily stock must be at least 1.');
  if (!body.pickup_start) errors.push('Pickup start time is required.');
  if (!body.pickup_end) errors.push('Pickup end time is required.');
  const validCategories = ['bread_bakery', 'prepared_meals', 'pastry_snacks', 'fruits_vegetables', 'dairy', 'mixed'];
  if (!body.category || !validCategories.includes(body.category)) errors.push(`Category must be one of: ${validCategories.join(', ')}.`);
  return errors;
});

// ===================== ORDER VALIDATORS =====================

const validateOrder = validate((body) => {
  const errors = [];
  if (!body.product_id || isNaN(body.product_id)) errors.push('Valid product_id is required.');
  if (!body.quantity || isNaN(body.quantity) || body.quantity < 1) errors.push('Quantity must be at least 1.');
  return errors;
});

// ===================== PAYMENT VALIDATORS =====================

const validatePayment = validate((body) => {
  const errors = [];
  if (!body.order_id || isNaN(body.order_id)) errors.push('Valid order_id is required.');
  return errors;
});

// ===================== MERCHANT VALIDATORS =====================

const validateMerchantProfile = validate((body) => {
  const errors = [];
  if (body.store_name !== undefined && body.store_name.trim().length < 2) errors.push('Store name min 2 chars.');
  if (body.phone !== undefined && body.phone.trim().length < 8) errors.push('Phone must be at least 8 chars.');
  return errors;
});

// ===================== COMPLAINT VALIDATORS =====================

const validateComplaint = validate((body) => {
  const errors = [];
  if (!body.subject || body.subject.trim().length < 5) errors.push('Subject is required (min 5 chars).');
  if (!body.description || body.description.trim().length < 10) errors.push('Description is required (min 10 chars).');
  return errors;
});

module.exports = {
  validate,
  validateRegister,
  validateLogin,
  validateProduct,
  validateOrder,
  validatePayment,
  validateMerchantProfile,
  validateComplaint,
};
