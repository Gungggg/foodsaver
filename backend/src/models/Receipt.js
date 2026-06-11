/**
 * @fileoverview Receipt model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Receipt = sequelize.define('Receipt', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    receipt_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    receipt_data: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Structured receipt info: items, totals, merchant, customer',
    },
    qr_code_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'receipts',
    timestamps: true,
    underscored: true,
    updatedAt: false,
  });

  Receipt.associate = (models) => {
    Receipt.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  };

  return Receipt;
};
