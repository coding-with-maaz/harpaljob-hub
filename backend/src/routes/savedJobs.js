const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  getSavedJobs,
  saveJob,
  unsaveJob,
  checkSavedJob
} = require('../controllers/savedJobController');

// Get user's saved jobs
router.get('/', protect, getSavedJobs);

// Save a job
router.post('/:jobId', protect, saveJob);

// Unsave a job
router.delete('/:jobId', protect, unsaveJob);

// Check if a job is saved
router.get('/:jobId/check', protect, checkSavedJob);

module.exports = router; 