const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

// User - Job associations
User.hasMany(Job, {
  foreignKey: 'userId',
  as: 'postedJobs'
});

Job.belongsTo(User, {
  foreignKey: 'userId',
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

module.exports = {
  User,
  Job,
  Application
}; 