const { User, Job, Application } = require('../models/associations');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Job,
          as: 'postedJobs',
          attributes: ['id', 'title', 'createdAt']
        },
        {
          model: Application,
          as: 'jobApplications',
          attributes: ['id', 'status', 'createdAt']
        }
      ]
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, currentPassword } = req.body;

    // If updating password, verify current password
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required'
        });
      }

      const user = await User.findByPk(req.user.id);
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
    }

    // Update user
    const user = await User.findByPk(req.user.id);
    await user.update({
      firstName,
      lastName,
      email,
      ...(password && { password: await bcrypt.hash(password, 10) })
    });

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.destroy();

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting account',
      error: error.message
    });
  }
};

// Get user's posted jobs
const getUserPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { employerId: req.user.id },
      include: [
        {
          model: Application,
          as: 'jobApplications',
          include: [
            {
              model: User,
              as: 'applicant',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching user\'s posted jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user\'s posted jobs',
      error: error.message
    });
  }
};

// Get user's job applications
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Job,
          as: 'job',
          include: [
            {
              model: User,
              as: 'employer',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching user\'s applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user\'s applications',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserPostedJobs,
  getUserApplications
}; 