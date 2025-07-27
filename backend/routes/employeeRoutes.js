const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect, supervisorOrAdmin } = require('../middlewares/authMiddleware');

router.post('/', protect, supervisorOrAdmin, employeeController.createEmployee);
router.get('/', protect, supervisorOrAdmin, employeeController.getEmployees);
router.put('/:id', protect, supervisorOrAdmin, employeeController.updateEmployee);
router.delete('/:id', protect, supervisorOrAdmin, employeeController.deleteEmployee);

module.exports = router;