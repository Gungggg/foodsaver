/**
 * @fileoverview Product model definition (surprise bags).
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    merchant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM('bread_bakery', 'prepared_meals', 'pastry_snacks', 'fruits_vegetables', 'dairy', 'mixed'),
      allowNull: false,
      defaultValue: 'mixed',
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    daily_stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 10,
    },
    current_stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 10,
    },
    pickup_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    pickup_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    estimated_weight_kg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0.50,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Merchant, { foreignKey: 'merchant_id', as: 'merchant' });
    Product.hasMany(models.Order, { foreignKey: 'product_id', as: 'orders' });
  };

  return Product;
};
