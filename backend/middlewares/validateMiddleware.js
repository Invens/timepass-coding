const { validationResult } = require('express-validator');

const validateMiddleware = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

module.exports = validateMiddleware;
