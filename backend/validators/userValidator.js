const { body } = require('express-validator');

const userValidator = {
  createUser: [
    body('role').isIn(['admin', 'advertiser', 'affiliate']).withMessage('Invalid role.'),
    body('first_name').notEmpty().withMessage('First name is required.'),
    body('last_name').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password_hash').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  ],

  updateUser: [
    body('first_name').optional().notEmpty().withMessage('First name cannot be empty.'),
    body('last_name').optional().notEmpty().withMessage('Last name cannot be empty.'),
    body('email').optional().isEmail().withMessage('Invalid email address.'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status.'),
  ],

  login: [
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password_hash').notEmpty().withMessage('Password is required.'),
  ],
};

module.exports = { userValidator };
