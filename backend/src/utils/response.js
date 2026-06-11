/**
 * @fileoverview Standardized API response helpers.
 */

/**
 * Send a success response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {*} data
 * @param {number} statusCode
 */
const successResponse = (res, message = 'Success', data = null, statusCode = 200) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} statusCode
 * @param {*} errors
 */
const errorResponse = (res, message = 'Error', statusCode = 500, errors = null) => {
  const payload = { success: false, message };
  if (errors !== null) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

/**
 * Send a paginated response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {Array} data
 * @param {{ page: number, limit: number, total: number }} meta
 */
const paginatedResponse = (res, message, data, meta) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: {
      page: meta.page,
      limit: meta.limit,
      total: meta.total,
      totalPages: Math.ceil(meta.total / meta.limit),
    },
  });
};

module.exports = { successResponse, errorResponse, paginatedResponse };
