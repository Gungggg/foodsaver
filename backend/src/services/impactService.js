/**
 * @fileoverview Impact service – customer and platform impact aggregation.
 */
const { ImpactLog, User, Order, Merchant } = require('../models');
const { EMISSION_FACTORS } = require('../utils/impact');

class ImpactService {
  /**
   * Get customer's personal impact summary.
   * @param {number} customerId
   * @returns {Promise<object>}
   */
  async getCustomerImpact(customerId) {
    const foodSaved = await ImpactLog.sum('food_saved_kg', { where: { customer_id: customerId } });
    const co2Saved = await ImpactLog.sum('co2_saved_kg', { where: { customer_id: customerId } });
    const moneySaved = await ImpactLog.sum('money_saved', { where: { customer_id: customerId } });
    const totalPickups = await ImpactLog.count({ where: { customer_id: customerId } });

    // Recent impact logs
    const recentLogs = await ImpactLog.findAll({
      where: { customer_id: customerId },
      include: [{
        model: Order,
        as: 'order',
        attributes: ['id', 'order_number', 'created_at'],
      }],
      order: [['created_at', 'DESC']],
      limit: 10,
    });

    return {
      summary: {
        food_saved_kg: foodSaved || 0,
        co2_saved_kg: co2Saved || 0,
        money_saved: moneySaved || 0,
        total_pickups: totalPickups,
        trees_equivalent: co2Saved ? parseFloat((co2Saved / 21.77).toFixed(1)) : 0,
        meals_equivalent: foodSaved ? Math.round(foodSaved / 0.5) : 0,
      },
      recent_logs: recentLogs,
    };
  }

  /**
   * Get platform-wide public impact statistics.
   * @returns {Promise<object>}
   */
  async getPlatformImpact() {
    const foodSaved = await ImpactLog.sum('food_saved_kg');
    const co2Saved = await ImpactLog.sum('co2_saved_kg');
    const moneySaved = await ImpactLog.sum('money_saved');
    const totalPickups = await ImpactLog.count();
    const totalUsers = await User.count({ where: { role: 'customer' } });
    const totalMerchants = await Merchant.count({ where: { status: 'approved' } });

    return {
      food_saved_kg: foodSaved || 0,
      co2_saved_kg: co2Saved || 0,
      money_saved: moneySaved || 0,
      total_pickups: totalPickups,
      total_users: totalUsers,
      total_merchants: totalMerchants,
      trees_equivalent: co2Saved ? parseFloat((co2Saved / 21.77).toFixed(1)) : 0,
      meals_equivalent: foodSaved ? Math.round(foodSaved / 0.5) : 0,
      emission_factors: EMISSION_FACTORS,
    };
  }
}

module.exports = new ImpactService();
