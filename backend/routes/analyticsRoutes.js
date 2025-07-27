const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect, supervisorOrAdmin } = require('../middlewares/authMiddleware');

router.get('/', protect, supervisorOrAdmin, analyticsController.getAnalytics);
router.get('/charts/:type', protect, supervisorOrAdmin, analyticsController.getChartData);

module.exports = router;