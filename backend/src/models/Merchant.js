/**
 * @fileoverview Merchant model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Merchant = sequelize.define('Merchant', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },
    store_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    operating_hours: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'JSON object with day-of-week keys and open/close values',
    },
    category: {
      type: DataTypes.ENUM('restaurant', 'bakery', 'cafe', 'grocery', 'other'),
      allowNull: false,
      defaultValue: 'other',
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
      allowNull: false,
      defaultValue: 'pending',
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'merchants',
    timestamps: true,
    underscored: true,
  });

  Merchant.associate = (models) => {
    Merchant.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Merchant.hasMany(models.Document, { foreignKey: 'merchant_id', as: 'documents' });
    Merchant.hasMany(models.Product, { foreignKey: 'merchant_id', as: 'products' });
    Merchant.hasMany(models.Order, { foreignKey: 'merchant_id', as: 'orders' });
    Merchant.hasMany(models.ImpactLog, { foreignKey: 'merchant_id', as: 'impactLogs' });
  };

  return Merchant;
};
