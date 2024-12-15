const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FraudLog = sequelize.define('FraudLog', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  clickId: { type: DataTypes.BIGINT, allowNull: false },
  reason: { type: DataTypes.TEXT, allowNull: false },
  detectedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: true,
  tableName: 'fraud_logs',
});

module.exports = FraudLog;
