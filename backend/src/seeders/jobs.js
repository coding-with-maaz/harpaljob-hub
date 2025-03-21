const { Job, JobCategory, User } = require('../models/associations');

const sampleJobs = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    country: 'United States',
    type: 'full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced Frontend Developer to join our team. The ideal candidate will have strong experience with React, TypeScript, and modern frontend technologies.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern build tools',
      'Excellent problem-solving abilities'
    ],
    responsibilities: [
      'Develop and maintain our web applications',
      'Collaborate with the design team',
      'Write clean, maintainable code',
      'Participate in code reviews'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Remote work options'
    ],
    status: 'active',
    featured: true,
    views: 150,
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
  {
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Remote',
    country: 'United States',
    type: 'full-time',
    salary: '$100,000 - $130,000',
    description: 'Join our backend team to build scalable APIs and microservices. We use Node.js, Express, and PostgreSQL in our stack.',
    requirements: [
      '3+ years of Node.js experience',
      'Strong SQL skills',
      'Experience with microservices architecture',
      'Understanding of REST APIs'
    ],
    responsibilities: [
      'Design and implement APIs',
      'Optimize database queries',
      'Write unit tests',
      'Deploy and maintain services'
    ],
    benefits: [
      'Remote-first culture',
      'Flexible hours',
      'Learning budget',
      'Unlimited PTO'
    ],
    status: 'active',
    featured: true,
    views: 120,
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Design Co.',
    location: 'New York, NY',
    country: 'United States',
    type: 'full-time',
    salary: '$90,000 - $120,000',
    description: 'We are seeking a talented UI/UX Designer to create beautiful and intuitive user interfaces for our products.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma',
      'Strong portfolio',
      'Experience with user research'
    ],
    responsibilities: [
      'Create user interfaces',
      'Conduct user research',
      'Create design systems',
      'Collaborate with developers'
    ],
    benefits: [
      'Competitive salary',
      'Design tools subscription',
      'Conference attendance',
      'Health benefits'
    ],
    status: 'active',
    featured: true,
    views: 100,
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Seattle, WA',
    country: 'United States',
    type: 'full-time',
    salary: '$130,000 - $160,000',
    description: 'Looking for a DevOps Engineer to help us build and maintain our cloud infrastructure using AWS and Kubernetes.',
    requirements: [
      '4+ years of DevOps experience',
      'AWS certification',
      'Kubernetes expertise',
      'CI/CD pipeline experience'
    ],
    responsibilities: [
      'Manage cloud infrastructure',
      'Automate deployment processes',
      'Monitor system performance',
      'Implement security measures'
    ],
    benefits: [
      'Competitive salary',
      'AWS certification support',
      'Home office setup',
      'Health insurance'
    ],
    status: 'active',
    featured: true,
    views: 180,
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Mobile App Developer',
    company: 'AppInnovate',
    location: 'Remote',
    country: 'United States',
    type: 'contract',
    salary: '$80/hour',
    description: 'Seeking an experienced Mobile App Developer to help us build cross-platform mobile applications using React Native.',
    requirements: [
      '3+ years of React Native experience',
      'iOS/Android development',
      'Redux/MobX experience',
      'App store deployment experience'
    ],
    responsibilities: [
      'Develop mobile applications',
      'Optimize app performance',
      'Write unit tests',
      'Deploy to app stores'
    ],
    benefits: [
      'Flexible hours',
      'Remote work',
      'Competitive rate',
      'Project-based work'
    ],
    status: 'active',
    featured: false,
    views: 90,
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }
];

const seedJobs = async () => {
  try {
    // Get or create a default employer
    const [employer] = await User.findOrCreate({
      where: { email: 'employer@example.com' },
      defaults: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'employer@example.com',
        password: 'hashedPassword123', // In production, use proper password hashing
        role: 'employer',
        companyName: 'TechCorp Inc.'
      }
    });

    // Get all categories
    const categories = await JobCategory.findAll();
    if (!categories.length) {
      console.log('No categories found. Please seed categories first.');
      return;
    }

    // Create jobs
    for (const jobData of sampleJobs) {
      // Randomly assign a category
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      await Job.create({
        ...jobData,
        employerId: employer.id,
        categoryId: randomCategory.id,
        categoryName: randomCategory.name
      });
    }

    console.log('Jobs seeded successfully!');
  } catch (error) {
    console.error('Error seeding jobs:', error);
  }
};

module.exports = seedJobs; 