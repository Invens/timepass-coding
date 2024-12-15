const { body, param } = require('express-validator');

const affiliateValidator = {
  updateAffiliate: [
    param('id').isInt().withMessage('Affiliate ID must be an integer.'),
    body('affiliateTier')
      .optional()
      .isIn(['Bronze', 'Silver', 'Gold'])
      .withMessage('Affiliate tier must be Bronze, Silver, or Gold.'),
    body('status')
      .optional()
      .isIn(['active', 'inactive'])
      .withMessage('Status must be active or inactive.'),
  ],
};

module.exports = { affiliateValidator };
