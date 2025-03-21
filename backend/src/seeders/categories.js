const { JobCategory } = require('../models/associations');
const slugify = require('slugify');

const sampleCategories = [
  {
    name: 'Software Development',
    slug: 'software-development',
    description: 'Jobs related to software development, programming, and engineering',
    icon: '💻',
    isActive: true
  },
  {
    name: 'Design & Creative',
    slug: 'design-creative',
    description: 'Jobs in UI/UX design, graphic design, and creative roles',
    icon: '🎨',
    isActive: true
  },
  {
    name: 'DevOps & Cloud',
    slug: 'devops-cloud',
    description: 'Jobs in DevOps, cloud computing, and infrastructure',
    icon: '☁️',
    isActive: true
  },
  {
    name: 'Mobile Development',
    slug: 'mobile-development',
    description: 'Jobs in mobile app development and related technologies',
    icon: '📱',
    isActive: true
  },
  {
    name: 'Data Science',
    slug: 'data-science',
    description: 'Jobs in data analysis, machine learning, and AI',
    icon: '📊',
    isActive: true
  },
  {
    name: 'Product Management',
    slug: 'product-management',
    description: 'Jobs in product management and strategy',
    icon: '📈',
    isActive: true
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    description: 'Jobs in digital marketing, content creation, and SEO',
    icon: '📢',
    isActive: true
  },
  {
    name: 'Sales',
    slug: 'sales',
    description: 'Jobs in sales, business development, and account management',
    icon: '💰',
    isActive: true
  }
];

const seedCategories = async () => {
  try {
    for (const categoryData of sampleCategories) {
      await JobCategory.create(categoryData);
    }
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

module.exports = seedCategories; 