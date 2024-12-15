const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.ENUM('admin', 'advertiser', 'affiliate'), allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  im_platform: { type: DataTypes.ENUM('Skype', 'WhatsApp', 'Telegram', 'Other') },
  im_username: { type: DataTypes.STRING },
  company_name: { type: DataTypes.STRING },
  address_line1: { type: DataTypes.STRING },
  address_line2: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING },
  zipcode: { type: DataTypes.STRING },
  account_manager_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
  affiliate_tier: { type: DataTypes.ENUM('Bronze', 'Silver', 'Gold'), defaultValue: 'Bronze' },
  access_method: { type: DataTypes.ENUM('manual', 'api'), defaultValue: 'manual' },
  referred_by: { type: DataTypes.INTEGER },
}, {
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Map to snake_case column
    updatedAt: 'updated_at', // Map to snake_case column
    tableName: 'users',
});

module.exports = User;
