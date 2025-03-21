const seedCategories = require('./categories');
const seedJobs = require('./jobs');

const seedDatabase = async () => {
  try {
    // First seed categories
    await seedCategories();
    
    // Then seed jobs (which depend on categories)
    await seedJobs();
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase(); 