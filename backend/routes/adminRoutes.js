const express = require('express');
const router = express.Router();
const {
  getDashboardMetrics,
  getUsers,
  toggleUserStatus,
  getAdminQuestions,
  createQuestion,
  deleteQuestion
} = require('../controllers/adminController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

// Protect all admin routes
router.use(requireAuth, requireAdmin);

router.get('/dashboard', getDashboardMetrics);
router.get('/users', getUsers);
router.patch('/users/:id/toggle-status', toggleUserStatus);
router.get('/questions', getAdminQuestions);
router.post('/questions', createQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;
