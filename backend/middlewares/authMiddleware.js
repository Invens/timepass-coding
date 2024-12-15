const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = {
  // Check if the user is authenticated
  isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access. Token is missing.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded token data to the request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
  },

  // Check if the user is an admin
  isAdmin(req, res, next) {
    authMiddleware.isAuthenticated(req, res, () => {
      if (req.user.role === 'admin') {
        return next();
      }
      res.status(403).json({ message: 'Forbidden. Admin access required.' });
    });
  },

  // Check if the user is authorized for specific roles
  isAuthorized(...roles) {
    return (req, res, next) => {
      authMiddleware.isAuthenticated(req, res, () => {
        if (roles.includes(req.user.role) || (roles.includes('self') && req.user.id === parseInt(req.params.id))) {
          return next();
        }
        res.status(403).json({ message: 'Forbidden. Access denied.' });
      });
    };
  },
};

module.exports = authMiddleware;
