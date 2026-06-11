/**
 * @fileoverview User model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('customer', 'merchant', 'admin'),
      allowNull: false,
      defaultValue: 'customer',
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Merchant, { foreignKey: 'user_id', as: 'merchant' });
    User.hasMany(models.Order, { foreignKey: 'customer_id', as: 'orders' });
    User.hasMany(models.ImpactLog, { foreignKey: 'customer_id', as: 'impactLogs' });
    User.hasMany(models.Complaint, { foreignKey: 'user_id', as: 'complaints' });
  };

  return User;
};
