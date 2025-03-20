const { SavedJob, Job, User } = require('../models/associations');
const { Op } = require('sequelize');

// Get user's saved jobs
const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Job,
          include: [
            {
              model: User,
              as: 'employer',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ]
        }
      ],
      order: [['savedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: savedJobs.map(saved => saved.Job)
    });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching saved jobs',
      error: error.message
    });
  }
};

// Save a job
const saveJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if job is already saved
    const existingSavedJob = await SavedJob.findOne({
      where: {
        userId: req.user.id,
        jobId: req.params.jobId
      }
    });

    if (existingSavedJob) {
      return res.status(400).json({
        success: false,
        message: 'Job is already saved'
      });
    }

    // Save the job
    await SavedJob.create({
      userId: req.user.id,
      jobId: req.params.jobId
    });

    res.status(201).json({
      success: true,
      message: 'Job saved successfully'
    });
  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving job',
      error: error.message
    });
  }
};

// Unsave a job
const unsaveJob = async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      where: {
        userId: req.user.id,
        jobId: req.params.jobId
      }
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: 'Saved job not found'
      });
    }

    await savedJob.destroy();

    res.json({
      success: true,
      message: 'Job removed from saved jobs'
    });
  } catch (error) {
    console.error('Error removing saved job:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing saved job',
      error: error.message
    });
  }
};

// Check if a job is saved
const checkSavedJob = async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      where: {
        userId: req.user.id,
        jobId: req.params.jobId
      }
    });

    res.json({
      success: true,
      isSaved: !!savedJob
    });
  } catch (error) {
    console.error('Error checking saved job:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking saved job',
      error: error.message
    });
  }
};

module.exports = {
  getSavedJobs,
  saveJob,
  unsaveJob,
  checkSavedJob
}; 