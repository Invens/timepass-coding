const Campaign = require('../models/campaign');
const Click = require('../models/click');
const Conversion = require('../models/conversion');
const Report = require('../models/report');
const User = require('../models/user');

// Controller Functions
const affiliateController = {
  // Get all affiliates (Admin only)
  async getAllAffiliates(req, res) {
    try {
      const { status, affiliate_tier, limit = 10, offset = 0 } = req.query;
  
      const queryOptions = {
        where: { role: 'affiliate' },
        attributes: ['id', 'first_name', 'last_name', 'email', 'affiliate_tier', 'access_method', 'status'],
        include: [
          {
            model: User,
            as: 'referrer',
            attributes: ['first_name', 'last_name', 'email'],
          },
        ],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      };
  
      console.log('Query Options:', queryOptions);
  
      const affiliates = await User.findAll(queryOptions);
  
      if (!affiliates || affiliates.length === 0) {
        return res.status(404).json({ message: 'No affiliates found.' });
      }
  
      res.status(200).json(affiliates);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      res.status(500).json({ message: 'An error occurred while fetching affiliates.', error: error.message });
    }
  },
  

  // Get details of a specific affiliate
  async getAffiliateById(req, res) {
    try {
      const { id } = req.params;

      const affiliate = await User.findOne({
        where: { id, role: 'affiliate' },
        attributes: ['id', 'first_name', 'last_name', 'email', 'affiliate_tier', 'access_method', 'status'],
        include: [
          {
            model: User,
            as: 'referrer', // Optional: Referral details
            attributes: ['first_name', 'last_name', 'email'],
          },
        ],
      });

      if (!affiliate) {
        return res.status(404).json({ message: 'Affiliate not found.' });
      }

      res.status(200).json(affiliate);
    } catch (error) {
      console.error('Error fetching affiliate:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Update a specific affiliate (Admin only)
  async updateAffiliate(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const affiliate = await User.findOne({ where: { id, role: 'affiliate' } });
      if (!affiliate) {
        return res.status(404).json({ message: 'Affiliate not found.' });
      }

      // Update affiliate details
      await affiliate.update(updates);

      res.status(200).json({ message: 'Affiliate updated successfully.', affiliate });
    } catch (error) {
      console.error('Error updating affiliate:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Soft delete an affiliate (Admin only)
  async deleteAffiliate(req, res) {
    try {
      const { id } = req.params;

      const affiliate = await User.findOne({ where: { id, role: 'affiliate' } });
      if (!affiliate) {
        return res.status(404).json({ message: 'Affiliate not found.' });
      }

      // Soft delete (set status to inactive)
      await affiliate.update({ status: 'inactive' });

      res.status(200).json({ message: 'Affiliate deleted successfully.' });
    } catch (error) {
      console.error('Error deleting affiliate:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Get affiliate-specific dashboard data
  async getAffiliateDashboard(req, res) {
    try {
      const { id } = req.params;

      // Validate affiliate existence
      const affiliate = await User.findOne({ where: { id, role: 'affiliate' } });
      if (!affiliate) {
        return res.status(404).json({ message: 'Affiliate not found.' });
      }

      // Fetch performance data
      const clicks = await Click.count({ where: { affiliate_id: id } });
      const conversions = await Conversion.count({ where: { affiliate_id: id } });
      const revenue = await Conversion.sum('revenue', { where: { affiliate_id: id } });

      res.status(200).json({ clicks, conversions, revenue });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Get campaigns assigned to an affiliate
  async getAffiliateCampaigns(req, res) {
    try {
      const { id } = req.params;

      // Validate affiliate existence
      const affiliate = await User.findOne({ where: { id, role: 'affiliate' } });
      if (!affiliate) {
        return res.status(404).json({ message: 'Affiliate not found.' });
      }

      // Fetch assigned campaigns
      const campaigns = await Campaign.findAll({
        where: { affiliate_id: id, status: 'active' },
      });

      res.status(200).json(campaigns);
    } catch (error) {
      console.error('Error fetching affiliate campaigns:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },

  // Get performance reports for an affiliate
  async getAffiliateReports(req, res) {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;

      // Validate affiliate existence
      const affiliate = await User.findOne({ where: { id, role: 'affiliate' } });
      if (!affiliate) {
        return res.status(404).json({ message: 'Affiliate not found.' });
      }

      // Fetch performance reports
      const reports = await Report.findAll({
        where: {
          affiliate_id: id,
          date: {
            ...(startDate && { $gte: new Date(startDate) }),
            ...(endDate && { $lte: new Date(endDate) }),
          },
        },
      });

      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching affiliate reports:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  },
};

module.exports = affiliateController;
