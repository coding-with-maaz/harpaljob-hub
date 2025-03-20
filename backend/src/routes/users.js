const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserPostedJobs,
  getUserApplications
} = require('../controllers/userController');

// Get all users (admin only)
router.get('/', protect, authorize('admin'), getAllUsers);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put('/profile', protect, updateUserProfile);

// Delete user account
router.delete('/profile', protect, deleteUserAccount);

// Get user's posted jobs
router.get('/posted-jobs', protect, getUserPostedJobs);

// Get user's job applications
router.get('/applications', protect, getUserApplications);

module.exports = router; 