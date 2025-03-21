
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Jobs',
      key: 'id'
    }
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resumeFileName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resumeFileType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'),
    defaultValue: 'pending'
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Application; 
