const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GeoData = sequelize.define('GeoData', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  ipAddress: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING },
  region: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  latitude: { type: DataTypes.DECIMAL(9, 6) },
  longitude: { type: DataTypes.DECIMAL(9, 6) },
}, {
  timestamps: true,
  tableName: 'geo_data',
});

module.exports = GeoData;
