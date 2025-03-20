const { Job, User } = require('../models/associations');
const { Op } = require('sequelize');

// Get all jobs with filters and pagination
const getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      type,
      category,
      remote,
      minSalary,
      maxSalary,
      sort = 'newest',
      page = 1,
      limit = 10
    } = req.query;

    const offset = (page - 1) * limit;

    // Build where clause
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (location) {
      where.location = { [Op.iLike]: `%${location}%` };
    }
    if (type) {
      where.type = type;
    }
    if (category) {
      where.category = category;
    }
    if (remote) {
      where.remote = remote === 'true';
    }
    if (minSalary) {
      where.salary = { ...where.salary, [Op.gte]: minSalary };
    }
    if (maxSalary) {
      where.salary = { ...where.salary, [Op.lte]: maxSalary };
    }

    // Build order clause
    let order = [];
    switch (sort) {
      case 'oldest':
        order = [['createdAt', 'ASC']];
        break;
      case 'highest_salary':
        order = [['salary', 'DESC']];
        break;
      case 'lowest_salary':
        order = [['salary', 'ASC']];
        break;
      default: // newest
        order = [['createdAt', 'DESC']];
    }

    // Get jobs with pagination
    const { count, rows } = await Job.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// Get a single job
const getJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
};

// Create a new job
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employerId: req.user.id
    });

    const jobWithEmployer = await Job.findByPk(job.id, {
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      data: jobWithEmployer
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message
    });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the employer
    if (job.employerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    await job.update(req.body);

    const updatedJob = await Job.findByPk(job.id, {
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    res.json({
      success: true,
      data: updatedJob
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: error.message
    });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the employer
    if (job.employerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.destroy();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message
    });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}; 