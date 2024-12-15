const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  advertiserId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  offerUrl: { type: DataTypes.TEXT, allowNull: false },
  impressionUrl: { type: DataTypes.TEXT },
  payoutModel: { type: DataTypes.ENUM('CPA', 'CPL', 'CPC', 'RPA'), allowNull: false },
  payoutAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  geoTargeting: { type: DataTypes.JSON },
  deviceTargeting: { type: DataTypes.JSON },
  carrierTargeting: { type: DataTypes.JSON },
  allowedTrafficTypes: { type: DataTypes.JSON },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  dailyClickCap: { type: DataTypes.INTEGER },
  dailyConversionCap: { type: DataTypes.INTEGER },
  totalCap: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('active', 'paused', 'completed'), defaultValue: 'active' },
}, {
  timestamps: true,
  tableName: 'campaigns',
});

module.exports = Campaign;
