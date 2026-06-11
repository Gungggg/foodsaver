/**
 * @fileoverview Payment model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    gateway_ref: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed', 'expired'),
      allowNull: false,
      defaultValue: 'pending',
    },
    gateway_response: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'payments',
    timestamps: true,
    underscored: true,
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  };

  return Payment;
};
