/**
 * @fileoverview Environmental impact calculation utilities.
 * CO2 emission factors represent kg of CO2e that would have been emitted
 * if the food were produced from scratch to replace the wasted food.
 */

/** CO2 emission factors per product category (kg CO2e per kg food) */
const EMISSION_FACTORS = {
  bread_bakery: 1.3,
  prepared_meals: 3.5,
  pastry_snacks: 2.0,
  fruits_vegetables: 0.8,
  dairy: 2.5,
  mixed: 2.5,
};

/**
 * Calculate CO2 saved by rescuing food.
 * @param {string} category - Product category
 * @param {number} weightKg - Weight of food saved in kg
 * @returns {number} CO2 saved in kg
 */
function calculateCO2Saved(category, weightKg) {
  const factor = EMISSION_FACTORS[category] || EMISSION_FACTORS.mixed;
  return parseFloat((factor * weightKg).toFixed(2));
}

/**
 * Calculate money saved (difference between original and discounted price).
 * @param {number} originalPrice
 * @param {number} discountedPrice
 * @param {number} quantity
 * @returns {number}
 */
function calculateMoneySaved(originalPrice, discountedPrice, quantity = 1) {
  return parseFloat(((originalPrice - discountedPrice) * quantity).toFixed(2));
}

/**
 * Build a complete impact record for an order.
 * @param {object} params
 * @param {string} params.category - Product category
 * @param {number} params.weightKg - Estimated weight per unit in kg
 * @param {number} params.quantity - Number of units
 * @param {number} params.originalPrice
 * @param {number} params.discountedPrice
 * @returns {{ foodSavedKg: number, co2SavedKg: number, moneySaved: number }}
 */
function calculateImpact({ category, weightKg, quantity, originalPrice, discountedPrice }) {
  const foodSavedKg = parseFloat((weightKg * quantity).toFixed(2));
  const co2SavedKg = calculateCO2Saved(category, foodSavedKg);
  const moneySaved = calculateMoneySaved(originalPrice, discountedPrice, quantity);

  return { foodSavedKg, co2SavedKg, moneySaved };
}

module.exports = { EMISSION_FACTORS, calculateCO2Saved, calculateMoneySaved, calculateImpact };
