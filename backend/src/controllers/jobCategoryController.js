const { JobCategory, Job } = require('../models/associations');
const { Op } = require('sequelize');
const slugify = require('slugify');
const sequelize = require('sequelize');

// Get all job categories with optional search
exports.getAllCategories = async (req, res) => {
  try {
    const { search, sort = 'name', order = 'asc', page = 1, limit = 10 } = req.query;
    
    const result = await JobCategory.search(search, {
      page,
      limit,
      sort,
      order: order.toUpperCase()
    });
    
    res.status(200).json({
      success: true,
      data: result.categories,
      pagination: result.pagination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get single job category with job count
exports.getCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    
    // Get active jobs count for this category
    const activeJobsCount = await Job.count({
      where: {
        categoryId: category.id,
        status: 'active'
      }
    });
    
    res.status(200).json({
      success: true,
      data: {
        ...category.toJSON(),
        activeJobsCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Create new job category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    
    // Check if category with same name exists
    const existingCategory = await JobCategory.findOne({
      where: { name }
    });
    
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'Category with this name already exists'
      });
    }
    
    const category = await JobCategory.create({
      name,
      description,
      icon
    });
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update job category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;
    
    const category = await JobCategory.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    
    // If name is being updated, check for duplicates
    if (name && name !== category.name) {
      const existingCategory = await JobCategory.findOne({
        where: {
          name,
          id: { [Op.ne]: category.id }
        }
      });
      
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          error: 'Category with this name already exists'
        });
      }
    }
    
    await category.update({
      name: name || category.name,
      description: description || category.description,
      icon: icon || category.icon,
      isActive: isActive !== undefined ? isActive : category.isActive
    });
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete job category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    
    // Check if category has any jobs
    const jobCount = await Job.count({
      where: {
        categoryId: category.id
      }
    });
    
    if (jobCount > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete category with existing jobs'
      });
    }
    
    await category.destroy();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get category statistics
exports.getCategoryStats = async (req, res) => {
  try {
    const categories = await JobCategory.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'icon',
        'jobCount',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM jobs
            WHERE jobs.categoryId = JobCategory.id
            AND jobs.status = 'active'
          )`),
          'activeJobs'
        ]
      ]
    });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

module.exports = exports; 