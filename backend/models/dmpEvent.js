const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DmpEvent = sequelize.define('DmpEvent', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  eventType: { type: DataTypes.ENUM('click', 'impression', 'conversion'), allowNull: false },
  trackingLinkId: { type: DataTypes.INTEGER, allowNull: false },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  affiliateId: { type: DataTypes.INTEGER, allowNull: false },
  geoData: { type: DataTypes.JSON },
  deviceData: { type: DataTypes.JSON },
  trafficSource: { type: DataTypes.STRING },
  eventMetadata: { type: DataTypes.JSON },
}, {
  timestamps: true,
  tableName: 'dmp_events',
});

module.exports = DmpEvent;
