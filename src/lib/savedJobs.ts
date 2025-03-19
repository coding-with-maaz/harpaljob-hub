
import { SavedJob } from './types';

// Get all saved jobs from localStorage
export const getSavedJobs = (): SavedJob[] => {
  try {
    const savedJobs = localStorage.getItem('savedJobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  } catch (error) {
    console.error('Error getting saved jobs:', error);
    return [];
  }
};

// Check if a job is saved
export const isJobSaved = (jobId: string): boolean => {
  const savedJobs = getSavedJobs();
  return savedJobs.some(job => job.id === jobId);
};

// Save a job to localStorage
export const saveJob = (jobId: string): void => {
  try {
    const savedJobs = getSavedJobs();
    if (!isJobSaved(jobId)) {
      const newSavedJob: SavedJob = {
        id: jobId,
        savedAt: new Date().toISOString(),
      };
      savedJobs.push(newSavedJob);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
  } catch (error) {
    console.error('Error saving job:', error);
  }
};

// Remove a saved job from localStorage
export const removeSavedJob = (jobId: string): void => {
  try {
    const savedJobs = getSavedJobs();
    const updatedSavedJobs = savedJobs.filter(job => job.id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  } catch (error) {
    console.error('Error removing saved job:', error);
  }
};

// Toggle saved status of a job
export const toggleSaveJob = (jobId: string): boolean => {
  const isSaved = isJobSaved(jobId);
  if (isSaved) {
    removeSavedJob(jobId);
    return false;
  } else {
    saveJob(jobId);
    return true;
  }
};
