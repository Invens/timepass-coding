const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Click = sequelize.define('Click', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  trackingLinkId: { type: DataTypes.INTEGER, allowNull: false },
  affClickId: { type: DataTypes.STRING, allowNull: false, unique: true },
  ipAddress: { type: DataTypes.STRING },
  userAgent: { type: DataTypes.TEXT },
  geoData: { type: DataTypes.JSON },
  deviceData: { type: DataTypes.JSON },
  trafficSource: { type: DataTypes.STRING },
}, {
  timestamps: true,
  tableName: 'clicks',
});

module.exports = Click;
