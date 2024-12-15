const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with an in-memory SQLite database
const sequelize = new Sequelize('sqlite::memory:', { logging: console.log });

// Define the User model
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  referred_by: { type: DataTypes.INTEGER }, // Self-referencing column
}, {
  timestamps: false,
  tableName: 'users',
});

// Define associations
User.hasMany(User, { foreignKey: 'referred_by', as: 'referrals' });
User.belongsTo(User, { foreignKey: 'referred_by', as: 'referrer' });

// Sync and add test data
(async () => {
  try {
    await sequelize.sync({ force: true });

    // Insert sample data
    const referrer = await User.create({ first_name: 'Referrer', last_name: 'User', email: 'referrer@example.com' });
    await User.create({ first_name: 'John', last_name: 'Doe', email: 'john@example.com', referred_by: referrer.id });

    // Fetch user with referrer
    const users = await User.findAll({
      include: [
        { model: User, as: 'referrer', attributes: ['first_name', 'last_name', 'email'] },
      ],
    });

    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await sequelize.close();
  }
})();
