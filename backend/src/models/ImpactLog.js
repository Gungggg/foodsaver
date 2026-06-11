/**
 * @fileoverview ImpactLog model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ImpactLog = sequelize.define('ImpactLog', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    merchant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    food_saved_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    co2_saved_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    money_saved: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    tableName: 'impact_logs',
    timestamps: true,
    underscored: true,
    updatedAt: false,
  });

  ImpactLog.associate = (models) => {
    ImpactLog.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    ImpactLog.belongsTo(models.User, { foreignKey: 'customer_id', as: 'customer' });
    ImpactLog.belongsTo(models.Merchant, { foreignKey: 'merchant_id', as: 'merchant' });
  };

  return ImpactLog;
};
