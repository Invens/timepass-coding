const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Initialize an empty object to hold models
const db = {};

// Dynamically load all model files in the `models` folder
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.js')) // Skip index.js and non-JS files
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define models explicitly if needed (useful for dynamic loading issues)
const User = db.User || require('./user')(sequelize, Sequelize.DataTypes);
db.User = User;

// Define associations between models
// Self-referencing association for referrals
db.User.hasMany(db.User, { foreignKey: 'referred_by', as: 'referrals' }); // Users referred by this user
db.User.belongsTo(db.User, { foreignKey: 'referred_by', as: 'referrer' }); // User who referred this user

// Example associations for other models (adjust as per your models)
if (db.Campaign && db.TrackingLink) {
  db.Campaign.hasMany(db.TrackingLink, { foreignKey: 'campaignId', as: 'trackingLinks' });
  db.TrackingLink.belongsTo(db.Campaign, { foreignKey: 'campaignId', as: 'campaign' });
}

if (db.TrackingLink && db.Click) {
  db.TrackingLink.hasMany(db.Click, { foreignKey: 'trackingLinkId', as: 'clicks' });
  db.Click.belongsTo(db.TrackingLink, { foreignKey: 'trackingLinkId', as: 'trackingLink' });
}

if (db.Click && db.Conversion) {
  db.Click.hasOne(db.Conversion, { foreignKey: 'clickId', as: 'conversion' });
  db.Conversion.belongsTo(db.Click, { foreignKey: 'clickId', as: 'click' });
}

console.log('User Associations:', User.associations);

// Additional associations can be added here as needed
// e.g., Reports, Postbacks, etc.

// Attach Sequelize instance and models to the `db` object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
