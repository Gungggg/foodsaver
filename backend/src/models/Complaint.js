/**
 * @fileoverview Complaint model definition.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Complaint = sequelize.define('Complaint', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    resolution_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assigned_admin_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'complaints',
    timestamps: true,
    underscored: true,
  });

  Complaint.associate = (models) => {
    Complaint.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Complaint.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    Complaint.belongsTo(models.User, { foreignKey: 'assigned_admin_id', as: 'assignedAdmin' });
  };

  return Complaint;
};
