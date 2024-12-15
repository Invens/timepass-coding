const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const affiliateRoutes = require('./affiliateRoutes');

// User Routes
router.use('/users', userRoutes);

// Affiliate Routes
router.use('/affiliates', affiliateRoutes);

module.exports = router;
