const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Job, User } = require('../models/associations');
const { protect, authorize } = require('../middlewares/auth');

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const { search, type, location, status } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } }
      ];
    }

    if (type) where.type = type;
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (status) where.status = status;

    const jobs = await Job.findAll({
      where,
      include: [
        { model: User, as: 'employer', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching jobs'
    });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        { model: User, as: 'employer', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.json({
      status: 'success',
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching job'
    });
  }
});

// Create job (employers only)
router.post('/', protect, authorize('employer'), [
  body('title').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('company').notEmpty().trim(),
  body('location').notEmpty().trim(),
  body('type').isIn(['full-time', 'part-time', 'contract', 'internship']),
  body('experience').optional().trim(),
  body('requirements').optional().trim(),
  body('benefits').optional().trim(),
  body('deadline').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating job'
    });
  }
});

// Update job (employer or admin)
router.put('/:id', protect, authorize('employer', 'admin'), async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check if user is the employer or admin
    if (req.user.role !== 'admin' && job.userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this job'
      });
    }

    await job.update(req.body);

    res.json({
      status: 'success',
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating job'
    });
  }
});

// Delete job (employer or admin)
router.delete('/:id', protect, authorize('employer', 'admin'), async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check if user is the employer or admin
    if (req.user.role !== 'admin' && job.userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this job'
      });
    }

    await job.destroy();

    res.json({
      status: 'success',
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting job'
    });
  }
});

module.exports = router; 