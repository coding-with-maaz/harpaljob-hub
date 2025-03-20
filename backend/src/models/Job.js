const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  responsibilities: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  benefits: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  companySize: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'closed', 'draft'),
    defaultValue: 'active'
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  postedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Job; 