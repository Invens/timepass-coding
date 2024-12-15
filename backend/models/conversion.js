const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conversion = sequelize.define('Conversion', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  clickId: { type: DataTypes.BIGINT, allowNull: false },
  eventName: { type: DataTypes.STRING, allowNull: false },
  revenue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  geoData: { type: DataTypes.JSON },
  deviceData: { type: DataTypes.JSON },
  trafficSource: { type: DataTypes.STRING },
}, {
  timestamps: true,
  tableName: 'conversions',
});

module.exports = Conversion;
