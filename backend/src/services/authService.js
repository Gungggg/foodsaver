/**
 * @fileoverview Authentication service – handles registration, login, token generation.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { User, Merchant } = require('../models');

class AuthService {
  /**
   * Register a new user (customer or merchant).
   * @param {object} data - Registration payload
   * @returns {Promise<{ user: object, token: string }>}
   */
  async register(data) {
    // Check if email already exists
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) {
      const error = new Error('Email already registered.');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const password_hash = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await User.create({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      password_hash,
      role: data.role,
    });

    // If merchant, create merchant profile
    if (data.role === 'merchant') {
      await Merchant.create({
        user_id: user.id,
        store_name: data.store_name,
        description: data.description || null,
        address: data.address,
        city: data.city,
        phone: data.phone || null,
        category: data.category || 'other',
        status: 'pending',
      });
    }

    const token = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  /**
   * Authenticate user and return token.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ user: object, token: string }>}
   */
  async login(email, password) {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Merchant, as: 'merchant' }],
    });

    if (!user) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    // Check merchant status
    if (user.role === 'merchant' && user.merchant && user.merchant.status === 'suspended') {
      const error = new Error('Your merchant account has been suspended.');
      error.statusCode = 403;
      throw error;
    }

    const token = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      merchant: user.merchant || null,
      token,
    };
  }

  /**
   * Get current user profile.
   * @param {number} userId
   * @returns {Promise<object>}
   */
  async getMe(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password_hash'] },
      include: [{ model: Merchant, as: 'merchant' }],
    });

    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  /**
   * Generate a JWT for a user.
   * @param {object} user
   * @returns {string}
   */
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }

  /**
   * Strip sensitive fields from user object.
   * @param {object} user
   * @returns {object}
   */
  sanitizeUser(user) {
    const plain = user.toJSON ? user.toJSON() : { ...user };
    delete plain.password_hash;
    return plain;
  }
}

module.exports = new AuthService();
