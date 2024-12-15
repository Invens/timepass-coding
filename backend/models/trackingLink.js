const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrackingLink = sequelize.define('TrackingLink', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  affiliateId: { type: DataTypes.INTEGER, allowNull: false },
  trackingDomain: { type: DataTypes.STRING, allowNull: false },
  redirectUrl: { type: DataTypes.TEXT, allowNull: false },
  redirectPath: { type: DataTypes.TEXT },
  subIds: { type: DataTypes.JSON },
  generatedLink: { type: DataTypes.TEXT, allowNull: false },
}, {
  timestamps: true,
  tableName: 'tracking_links',
});

module.exports = TrackingLink;
