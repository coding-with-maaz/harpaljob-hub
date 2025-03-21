const { Job, User, JobCategory } = require('../models/associations');
const { Op, literal } = require('sequelize');

// Get all jobs with filters and pagination
const getJobs = async (req, res) => {
  try {
    const {
      query,
      location,
      category,
      employmentType,
      sortBy = 'relevance',
      page = 1,
      limit = 10,
      featured = false
    } = req.query;

    const offset = (page - 1) * limit;

    // Build where clause
    const where = {};
    
    // Search query (title, company, or description)
    if (query) {
      where[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { company: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ];
    }

    // Location filter
    if (location) {
      where[Op.or] = [
        { location: { [Op.like]: `%${location}%` } },
        { country: { [Op.like]: `%${location}%` } }
      ];
    }

    // Category filter
    if (category) {
      where.categoryId = category;
    }

    // Employment type filter
    if (employmentType) {
      where.type = employmentType;
    }

    // Featured jobs filter
    if (featured === 'true') {
      where.featured = true;
    }

    // Active jobs only
    where.status = 'active';

    // Build order clause
    let order = [];
    switch (sortBy) {
      case 'recent':
        order = [['postedDate', 'DESC']];
        break;
      case 'salary-high':
        order = [['salary', 'DESC']];
        break;
      case 'salary-low':
        order = [['salary', 'ASC']];
        break;
      case 'relevance':
      default:
        if (query) {
          // If there's a search query, order by title match first, then by date
          order = [
            [literal(`CASE WHEN title LIKE '%${query}%' THEN 1 ELSE 2 END`)],
            ['postedDate', 'DESC']
          ];
        } else {
          // Default to most recent if no search query
          order = [['postedDate', 'DESC']];
        }
    }

    // Get jobs with pagination
    const { count, rows } = await Job.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
        },
        {
          model: JobCategory,
          as: 'jobCategory',
          attributes: ['id', 'name', 'icon']
        }
      ],
      order,
      limit: parseInt(limit),
      offset: parseInt(offset),
      distinct: true
    });

    // Get trending companies (companies with most active jobs)
    const trendingCompanies = await Job.findAll({
      where: { status: 'active' },
      attributes: [
        'company',
        [literal('COUNT(*)'), 'jobCount']
      ],
      group: ['company'],
      order: [[literal('COUNT(*)'), 'DESC']],
      limit: 5
    });

    // Get popular job searches
    const popularSearches = await Job.findAll({
      where: { status: 'active' },
      attributes: [
        'title',
        [literal('COUNT(*)'), 'count']
      ],
      group: ['title'],
      order: [[literal('COUNT(*)'), 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        jobs: rows,
        trending: {
          companies: trendingCompanies,
          searches: popularSearches
        }
      },
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        hasMore: offset + rows.length < count
      },
      filters: {
        query,
        location,
        category,
        employmentType,
        sortBy
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

// Get featured jobs for home page
const getFeaturedJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const jobs = await Job.findAll({
      where: {
        featured: true,
        status: 'active'
      },
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
        },
        {
          model: JobCategory,
          as: 'jobCategory',
          attributes: ['id', 'name', 'icon']
        }
      ],
      order: [['postedDate', 'DESC']],
      limit
    });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured jobs',
      error: error.message
    });
  }
};

// Get latest jobs for home page
const getLatestJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const jobs = await Job.findAll({
      where: {
        status: 'active'
      },
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
        },
        {
          model: JobCategory,
          as: 'jobCategory',
          attributes: ['id', 'name', 'icon']
        }
      ],
      order: [['postedDate', 'DESC']],
      limit
    });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest jobs',
      error: error.message
    });
  }
};

// Get jobs by category
const getJobsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 10, sortBy = 'recent' } = req.query;
    const offset = (page - 1) * limit;

    // Build order clause
    let order = [];
    switch (sortBy) {
      case 'salary-high':
        order = [[literal(`CAST(REGEXP_REPLACE(salary, '[^0-9]', '', 'g') AS INTEGER)`), 'DESC']];
        break;
      case 'salary-low':
        order = [[literal(`CAST(REGEXP_REPLACE(salary, '[^0-9]', '', 'g') AS INTEGER)`), 'ASC']];
        break;
      case 'recent':
      default:
        order = [['postedDate', 'DESC']];
    }

    const { count, rows } = await Job.findAndCountAll({
      where: {
        categoryId,
        status: 'active'
      },
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
        },
        {
          model: JobCategory,
          as: 'jobCategory',
          attributes: ['id', 'name', 'icon']
        }
      ],
      order,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Get category details
    const category = await JobCategory.findByPk(categoryId);

    res.json({
      success: true,
      data: {
        jobs: rows,
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          jobCount: category.jobCount
        }
      },
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        hasMore: offset + rows.length < count
      }
    });
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs by category',
      error: error.message
    });
  }
};

// Get job by ID or slug
const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by ID first
    let job = await Job.findByPk(id, {
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
        },
        {
          model: JobCategory,
          as: 'jobCategory',
          attributes: ['id', 'name', 'icon']
        }
      ]
    });
    
    // If not found by ID, try to find by slug
    if (!job) {
      job = await Job.findOne({
        where: { slug: id },
        include: [
          {
            model: User,
            as: 'employer',
            attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
          },
          {
            model: JobCategory,
            as: 'jobCategory',
            attributes: ['id', 'name', 'icon']
          }
        ]
      });
    }
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Increment view count
    await job.increment('views');
    
    // Get similar jobs
    const similarJobs = await Job.findAll({
      where: {
        id: { [Op.ne]: job.id },
        categoryId: job.categoryId,
        status: 'active'
      },
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'companyName']
        },
        {
          model: JobCategory,
          as: 'jobCategory',
          attributes: ['id', 'name', 'icon']
        }
      ],
      limit: 3,
      order: [['postedDate', 'DESC']]
    });
    
    res.json({
      success: true,
      data: {
        job,
        similarJobs
      }
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
    // Validate category exists
    if (req.body.categoryId) {
      const category = await JobCategory.findById(req.body.categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Invalid job category'
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Job category is required'
      });
    }

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

    // Validate category if being updated
    if (req.body.categoryId) {
      const category = await JobCategory.findById(req.body.categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Invalid job category'
        });
      }
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
  getFeaturedJobs,
  getLatestJobs,
  getJobsByCategory,
  getJob,
  createJob,
  updateJob,
  deleteJob
}; 