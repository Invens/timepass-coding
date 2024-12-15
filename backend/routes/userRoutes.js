const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { userValidator } = require('../validators/userValidator');

// Routes for User Management

// Create a new user (Admin only)
router.post('/', authMiddleware.isAdmin, validateMiddleware(userValidator.createUser), userController.createUser);
router.post('/setup', validateMiddleware(userValidator.createUser), userController.createUser);

// Public registration route for affiliates
router.post('/register', validateMiddleware(userValidator.createUser), userController.createUser);

// Get a list of users (Admin only)
router.get('/', authMiddleware.isAdmin, userController.getUsers);

// Get details of a specific user
router.get('/:id', authMiddleware.isAuthenticated, userController.getUserById);

// Update a specific user (Admin only or user self-update)
router.put('/:id', authMiddleware.isAuthorized('admin', 'self'), validateMiddleware(userValidator.updateUser), userController.updateUser);

// Soft delete a user (Admin only)
router.delete('/:id', authMiddleware.isAdmin, userController.deleteUser);

// User Login
router.post('/login', validateMiddleware(userValidator.login), userController.login);

module.exports = router;
