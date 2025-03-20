const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Application, Job, User } = require('../models/associations');
const { protect, authorize } = require('../middlewares/auth');

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

// Apply for a job
router.post('/', protect, [
  body('jobId').isInt(),
  body('resume').notEmpty().trim(),
  body('coverLetter').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId, resume, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check if job is active
    if (job.status !== 'active') {
      return res.status(400).json({
        status: 'error',
        message: 'This job is not accepting applications'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: {
        userId: req.user.id,
        jobId
      }
    });

    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const application = await Application.create({
      userId: req.user.id,
      jobId,
      resume,
      coverLetter
    });

    // Increment job applications count
    job.applications += 1;
    await job.save();

    res.status(201).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating application'
    });
  }
});

// Update application status (employer or admin)
router.patch('/:id/status', protect, authorize('employer', 'admin'), [
  body('status').isIn(['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const application = await Application.findByPk(req.params.id, {
      include: [{ model: Job, as: 'job' }]
    });

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    // Check if user is authorized to update this application
    if (req.user.role !== 'admin' && application.job.userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this application'
      });
    }

    application.status = req.body.status;
    if (req.body.status === 'reviewed') {
      application.reviewedAt = new Date();
    }
    await application.save();

    res.json({
      status: 'success',
      data: application
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating application'
    });
  }
});

// Delete application (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    await application.destroy();

    res.json({
      status: 'success',
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting application'
    });
  }
});

module.exports = router; 