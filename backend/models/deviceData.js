const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DeviceData = sequelize.define('DeviceData', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  clickId: { type: DataTypes.BIGINT, allowNull: false },
  deviceType: { type: DataTypes.ENUM('mobile', 'desktop', 'tablet'), allowNull: false },
  os: { type: DataTypes.STRING },
  osVersion: { type: DataTypes.STRING },
  deviceId: { type: DataTypes.STRING },
  browser: { type: DataTypes.STRING },
}, {
  timestamps: true,
  tableName: 'device_data',
});

module.exports = DeviceData;
