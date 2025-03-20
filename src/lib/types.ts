export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'employer' | 'admin';
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  country: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: string;
  experience: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  tags: string[];
  logo: string;
  companyDescription: string;
  companySize: string;
  status: 'active' | 'closed' | 'draft';
  featured: boolean;
  postedDate: string;
  applicationDeadline?: string;
  views: number;
  userId: string;
  employer?: User;
}

export interface SavedJob {
  id: string;
  savedAt: string;
}

export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  portfolioUrl?: string;
  availableStartDate?: string;
  yearsOfExperience?: number;
}
