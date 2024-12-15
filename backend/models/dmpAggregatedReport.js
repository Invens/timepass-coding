const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DmpAggregatedReport = sequelize.define('DmpAggregatedReport', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  affiliateId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
  impressions: { type: DataTypes.INTEGER, defaultValue: 0 },
  conversions: { type: DataTypes.INTEGER, defaultValue: 0 },
  revenue: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
  geoData: { type: DataTypes.JSON },
  deviceData: { type: DataTypes.JSON },
  trafficSources: { type: DataTypes.JSON },
}, {
  timestamps: true,
  tableName: 'dmp_aggregated_reports',
});

module.exports = DmpAggregatedReport;
