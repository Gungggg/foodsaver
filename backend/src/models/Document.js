/**
 * @fileoverview Document model definition (merchant verification documents).
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document = sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    merchant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('business_license', 'food_safety_cert', 'id_card', 'tax_id', 'other'),
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'documents',
    timestamps: true,
    underscored: true,
    updatedAt: false,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Merchant, { foreignKey: 'merchant_id', as: 'merchant' });
  };

  return Document;
};
