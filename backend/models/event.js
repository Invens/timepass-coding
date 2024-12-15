const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  campaignId: { type: DataTypes.INTEGER, allowNull: false },
  eventName: { type: DataTypes.STRING, allowNull: false },
  eventToken: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true,
  tableName: 'events',
});

module.exports = Event;
