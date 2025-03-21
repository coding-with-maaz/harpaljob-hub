const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getFeaturedJobs,
  getLatestJobs
} = require('../controllers/jobController');

// Public routes
router.get('/', getJobs);
router.get('/featured', getFeaturedJobs);
router.get('/latest', getLatestJobs);
router.get('/:id', getJob);

// Protected routes (employers only)
router.post('/', protect, authorize('employer'), createJob);
router.put('/:id', protect, authorize('employer'), updateJob);
router.delete('/:id', protect, authorize('employer'), deleteJob);

module.exports = router; 