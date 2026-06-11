/**
 * @fileoverview Sequelize model index – initializes all models and associations.
 */
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    define: config.define || {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const db = {};

// Import all models
db.User = require('./User')(sequelize);
db.Merchant = require('./Merchant')(sequelize);
db.Document = require('./Document')(sequelize);
db.Product = require('./Product')(sequelize);
db.Order = require('./Order')(sequelize);
db.Payment = require('./Payment')(sequelize);
db.Receipt = require('./Receipt')(sequelize);
db.ImpactLog = require('./ImpactLog')(sequelize);
db.Complaint = require('./Complaint')(sequelize);

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
