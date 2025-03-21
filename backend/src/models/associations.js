const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');
const SavedJob = require('./SavedJob');
const JobCategory = require('./JobCategory');

// User - Job associations
User.hasMany(Job, {
  foreignKey: 'employerId',
  as: 'postedJobs'
});

Job.belongsTo(User, {
  foreignKey: 'employerId',
  as: 'employer'
});

// User - Application associations
User.hasMany(Application, {
  foreignKey: 'userId',
  as: 'jobApplications'
});

Application.belongsTo(User, {
  foreignKey: 'userId',
  as: 'applicant'
});

// Job - Application associations
Job.hasMany(Application, {
  foreignKey: 'jobId',
  as: 'jobApplications'
});

Application.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job'
});

// User - SavedJob associations
User.hasMany(SavedJob, {
  foreignKey: 'userId'
});

SavedJob.belongsTo(User, {
  foreignKey: 'userId'
});

// Job - SavedJob associations
Job.hasMany(SavedJob, {
  foreignKey: 'jobId'
});

SavedJob.belongsTo(Job, {
  foreignKey: 'jobId'
});

// Job - JobCategory associations
Job.belongsTo(JobCategory, {
  foreignKey: 'categoryId',
  as: 'jobCategory'
});

JobCategory.hasMany(Job, {
  foreignKey: 'categoryId',
  as: 'jobs'
});

// Hooks for job count management
Job.afterCreate(async (job) => {
  if (job.categoryId) {
    const category = await JobCategory.findByPk(job.categoryId);
    if (category) {
      await category.incrementJobCount();
    }
  }
});

Job.afterUpdate(async (job) => {
  if (job.changed('categoryId')) {
    // Decrease count from old category
    if (job.previous('categoryId')) {
      const oldCategory = await JobCategory.findByPk(job.previous('categoryId'));
      if (oldCategory) {
        await oldCategory.decrementJobCount();
      }
    }
    // Increase count in new category
    if (job.categoryId) {
      const newCategory = await JobCategory.findByPk(job.categoryId);
      if (newCategory) {
        await newCategory.incrementJobCount();
      }
    }
  }
});

Job.afterDestroy(async (job) => {
  if (job.categoryId) {
    const category = await JobCategory.findByPk(job.categoryId);
    if (category) {
      await category.decrementJobCount();
    }
  }
});

module.exports = {
  User,
  Job,
  Application,
  SavedJob,
  JobCategory
}; 