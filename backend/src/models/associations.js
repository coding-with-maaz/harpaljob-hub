const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');
const SavedJob = require('./SavedJob');

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

module.exports = {
  User,
  Job,
  Application,
  SavedJob
}; 