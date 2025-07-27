const express = require('express');
const router = express.Router();
const mistakeController = require('../controllers/mistakeController');
const { protect, supervisorOrAdmin } = require('../middlewares/authMiddleware');

router.post('/', protect, supervisorOrAdmin, mistakeController.createMistake);
router.get('/', protect, supervisorOrAdmin, mistakeController.getMistakes);
router.put('/:id', protect, supervisorOrAdmin, mistakeController.updateMistake);
router.delete('/:id', protect, supervisorOrAdmin, mistakeController.deleteMistake);
router.patch('/:id/solved', protect, supervisorOrAdmin, mistakeController.markSolved);

module.exports = router;