/**
 * @fileoverview Order model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    merchant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'picked_up', 'cancelled', 'expired'),
      allowNull: false,
      defaultValue: 'pending',
    },
    qr_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    pickup_deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    picked_up_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'customer_id', as: 'customer' });
    Order.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    Order.belongsTo(models.Merchant, { foreignKey: 'merchant_id', as: 'merchant' });
    Order.hasOne(models.Payment, { foreignKey: 'order_id', as: 'payment' });
    Order.hasOne(models.Receipt, { foreignKey: 'order_id', as: 'receipt' });
    Order.hasOne(models.ImpactLog, { foreignKey: 'order_id', as: 'impactLog' });
    Order.hasMany(models.Complaint, { foreignKey: 'order_id', as: 'complaints' });
  };

  return Order;
};
