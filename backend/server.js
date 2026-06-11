/**
 * @fileoverview FoodSaver API Entry Point
 * Initializes database connection and starts the Express server.
 */
require('dotenv').config();

const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 3000;

/**
 * Start the server after verifying database connectivity.
 */
async function startServer() {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync models in development (use migrations in production)
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: false });
      console.log('✅ Database models synchronized.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 FoodSaver API running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📖 API Base: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    process.exit(1);
  }
}

startServer();
