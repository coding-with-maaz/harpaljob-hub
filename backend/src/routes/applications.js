const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Application, Job, User } = require('../models/associations');
const { protect, authorize } = require('../middlewares/auth');
const {
  getJobApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/applicationController');

// Get all applications (admin or employer)
router.get('/', protect, authorize('admin', 'employer'), async (req, res) => {
  try {
    const where = {};
    
    // If user is an employer, only show applications for their jobs
    if (req.user.role === 'employer') {
      where['$job.userId$'] = req.user.id;
    }

    const applications = await Application.findAll({
      where,
      include: [
        { model: User, as: 'applicant', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Job, as: 'job', attributes: ['id', 'title', 'company'] }
      ],
      order: [['appliedAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching applications'
    });
  }
});

// Get user's applications
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Job, as: 'job', attributes: ['id', 'title', 'company', 'location'] }
      ],
      order: [['appliedAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching applications'
    });
  }
});

// Get all applications for a job (employer only)
router.get('/job/:jobId', protect, authorize('employer'), getJobApplications);

// Create a new application
router.post('/job/:jobId', protect, createApplication);

// Update application status (employer only)
router.put('/:id/status', protect, authorize('employer'), updateApplicationStatus);

// Delete application
router.delete('/:id', protect, deleteApplication);

module.exports = router; 