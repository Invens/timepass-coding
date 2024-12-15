const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Affiliate = sequelize.define('Affiliate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key to User
  affiliate_tier: { type: DataTypes.ENUM('Bronze', 'Silver', 'Gold'), defaultValue: 'Bronze' },
  access_method: { type: DataTypes.ENUM('manual', 'api'), defaultValue: 'manual' },
  default_tracking_domain: { type: DataTypes.STRING },
  referred_by: { type: DataTypes.INTEGER },
  affiliate_function_settings: { type: DataTypes.JSON },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, {
  timestamps: true,
  tableName: 'affiliates',
});

module.exports = Affiliate;
