const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Load environment variables
require('dotenv').config();

// Controller Functions
const userController = {
  // Create a new user
  async createUser(req, res) {
    try {
      const { role, first_name, last_name, email, password_hash, phone } = req.body;
  
      // Validate required fields
      if (!password_hash) {
        return res.status(400).json({ message: 'Password is required.' });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password_hash, 10);
  
      // Create the user
      const user = await User.create({
        role,
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        phone,
      });
  
      res.status(201).json({ message: 'User created successfully.', user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },  

  // Get a list of users
  async getUsers(req, res) {
    try {
      const { role, status, limit = 10, offset = 0 } = req.query;

      const queryOptions = {
        where: {},
        limit: parseInt(limit),
        offset: parseInt(offset),
      };

      if (role) queryOptions.where.role = role;
      if (status) queryOptions.where.status = status;

      const users = await User.findAll(queryOptions);

      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Get details of a specific user
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Update a specific user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update user details
      await user.update(updates);

      res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Soft delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Soft delete (set status to inactive)
      await user.update({ status: 'inactive' });

      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Authenticate user login
  async login(req, res) {
    try {
      const { email, password_hash } = req.body;

      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Invalid email or password.' });
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Generate a JWT
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },
};

module.exports = userController;
