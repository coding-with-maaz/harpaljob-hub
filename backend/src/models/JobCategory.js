const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../config/database');
const slugify = require('slugify');

const JobCategory = sequelize.define('JobCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'briefcase'
  },
  jobCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'job_categories',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  indexes: [
    {
      unique: true,
      fields: ['slug']
    }
  ],
  hooks: {
    beforeCreate: async (category) => {
      if (category.name) {
        // Check if name already exists
        const existingCategory = await JobCategory.findOne({
          where: { name: category.name }
        });
        if (existingCategory) {
          throw new Error('A category with this name already exists');
        }
        category.slug = slugify(category.name, { lower: true });
      }
    },
    beforeUpdate: async (category) => {
      if (category.changed('name')) {
        // Check if new name already exists
        const existingCategory = await JobCategory.findOne({
          where: { 
            name: category.name,
            id: { [Op.ne]: category.id }
          }
        });
        if (existingCategory) {
          throw new Error('A category with this name already exists');
        }
        category.slug = slugify(category.name, { lower: true });
      }
    }
  }
});

// Instance methods
JobCategory.prototype.incrementJobCount = async function() {
  this.jobCount += 1;
  await this.save();
};

JobCategory.prototype.decrementJobCount = async function() {
  if (this.jobCount > 0) {
    this.jobCount -= 1;
    await this.save();
  }
};

// Class methods
JobCategory.findBySlug = async function(slug) {
  return await this.findOne({ where: { slug } });
};

JobCategory.search = async function(query, options = {}) {
  const { page = 1, limit = 10, sort = 'name', order = 'ASC' } = options;
  const offset = (page - 1) * limit;

  const where = {};
  if (query) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${query}%` } },
      { description: { [Op.iLike]: `%${query}%` } }
    ];
  }

  const { count, rows } = await this.findAndCountAll({
    where,
    order: [[sort, order]],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  return {
    categories: rows,
    pagination: {
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit)
    }
  };
};

module.exports = JobCategory; 