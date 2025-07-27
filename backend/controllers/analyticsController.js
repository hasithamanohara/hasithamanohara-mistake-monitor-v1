const analyticsService = require('../services/analyticsService');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getAnalytics(req.user.role);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const { type } = req.params;
    const data = await analyticsService.getChartData(type);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};