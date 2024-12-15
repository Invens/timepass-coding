const { Sequelize } = require('sequelize');

// Load environment variables from .env
require('dotenv').config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database user
  process.env.DB_PASSWORD,    // Database password
  {
    host: process.env.DB_HOST,        // Database host
    dialect: 'mysql',                 // Using MySQL
    port: process.env.DB_PORT || 3306, // Default MySQL port
    logging: console.log, // Logs all SQL queries
    // Disable logging for cleaner output
    pool: {                           // Connection pool settings
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
