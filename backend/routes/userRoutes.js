const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/', protect, adminOnly, userController.createUser);
router.get('/', protect, adminOnly, userController.getUsers);
router.put('/:id', protect, adminOnly, userController.updateUser);
router.delete('/:id', protect, adminOnly, userController.deleteUser);

module.exports = router;