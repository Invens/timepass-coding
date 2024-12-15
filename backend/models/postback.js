const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Postback = sequelize.define('Postback', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  affiliateId: { type: DataTypes.INTEGER, allowNull: false },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  eventName: { type: DataTypes.STRING, allowNull: false },
  postbackUrl: { type: DataTypes.TEXT, allowNull: false },
  postbackType: { type: DataTypes.ENUM('server_postback', 'pixel'), allowNull: false },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, {
  timestamps: true,
  tableName: 'postbacks',
});

module.exports = Postback;
