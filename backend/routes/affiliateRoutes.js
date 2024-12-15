const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { affiliateValidator } = require('../validators/affiliateValidator');

// Routes for Admin (Managing Affiliates)
router.get('/', authMiddleware.isAdmin, affiliateController.getAllAffiliates);
router.get('/:id', authMiddleware.isAdmin, affiliateController.getAffiliateById);
router.put('/:id', authMiddleware.isAdmin, validateMiddleware(affiliateValidator.updateAffiliate), affiliateController.updateAffiliate);
router.delete('/:id', authMiddleware.isAdmin, affiliateController.deleteAffiliate);

// Routes for Affiliates (Accessing Own Data)
router.get('/:id/dashboard', authMiddleware.isAuthorized('affiliate', 'admin'), affiliateController.getAffiliateDashboard);
router.get('/:id/campaigns', authMiddleware.isAuthorized('affiliate', 'admin'), affiliateController.getAffiliateCampaigns);
router.get('/:id/reports', authMiddleware.isAuthorized('affiliate', 'admin'), affiliateController.getAffiliateReports);

module.exports = router;
