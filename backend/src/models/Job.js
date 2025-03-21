const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../config/database');
const slugify = require('slugify');

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
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'job_categories',
      key: 'id'
    }
  },
  categoryName: {
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
}, {
  tableName: 'jobs',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hooks: {
    beforeCreate: async (job) => {
      // Generate slug from title
      if (job.title) {
        let baseSlug = slugify(job.title, { lower: true });
        let slug = baseSlug;
        let counter = 1;
        
        // Check if slug exists and append number if needed
        while (true) {
          const existingJob = await Job.findOne({ where: { slug } });
          if (!existingJob) break;
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        
        job.slug = slug;
      }
      
      // Sync category name
      if (job.categoryId) {
        const JobCategory = require('./JobCategory');
        const category = await JobCategory.findByPk(job.categoryId);
        if (category) {
          job.categoryName = category.name;
        }
      }
    },
    beforeUpdate: async (job) => {
      // Generate new slug if title changed
      if (job.changed('title')) {
        let baseSlug = slugify(job.title, { lower: true });
        let slug = baseSlug;
        let counter = 1;
        
        // Check if slug exists and append number if needed
        while (true) {
          const existingJob = await Job.findOne({ 
            where: { 
              slug,
              id: { [Op.ne]: job.id } // Exclude current job
            }
          });
          if (!existingJob) break;
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        
        job.slug = slug;
      }
      
      // Sync category name
      if (job.changed('categoryId')) {
        const JobCategory = require('./JobCategory');
        const category = await JobCategory.findByPk(job.categoryId);
        if (category) {
          job.categoryName = category.name;
        }
      }
    }
  }
});

// Add class methods
Job.findBySlug = async function(slug) {
  return await this.findOne({ where: { slug } });
};

// Add a method to handle the slug column addition
Job.addSlugColumn = async function() {
  try {
    // First, check if the slug column exists
    const [results] = await sequelize.query('SHOW COLUMNS FROM jobs LIKE "slug"');
    if (results.length === 0) {
      // Add the column without unique constraint first
      await sequelize.query('ALTER TABLE jobs ADD COLUMN slug VARCHAR(255) NOT NULL DEFAULT ""');
      
      // Update existing records with unique slugs
      const jobs = await this.findAll();
      for (const job of jobs) {
        let baseSlug = slugify(job.title, { lower: true });
        let slug = baseSlug;
        let counter = 1;
        
        while (true) {
          const existingJob = await this.findOne({ 
            where: { 
              slug,
              id: { [Op.ne]: job.id }
            }
          });
          if (!existingJob) break;
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        
        await job.update({ slug });
      }
      
      // Finally, add the unique constraint
      await sequelize.query('ALTER TABLE jobs ADD UNIQUE INDEX jobs_slug_unique (slug)');
    } else {
      // If column exists but has empty values, update them
      const jobs = await this.findAll({
        where: {
          [Op.or]: [
            { slug: null },
            { slug: '' }
          ]
        }
      });

      for (const job of jobs) {
        let baseSlug = slugify(job.title, { lower: true });
        let slug = baseSlug;
        let counter = 1;
        
        while (true) {
          const existingJob = await this.findOne({ 
            where: { 
              slug,
              id: { [Op.ne]: job.id }
            }
          });
          if (!existingJob) break;
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        
        await job.update({ slug });
      }
    }
  } catch (error) {
    console.error('Error adding slug column:', error);
    throw error;
  }
};

module.exports = Job; 