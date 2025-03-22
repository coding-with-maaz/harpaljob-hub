
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'employer' | 'admin';
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  type: string;
  category: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  postedDate: string;
  deadline: string;
  logo: string;
  featured: boolean;
  views: number;
  applications: number;
  categoryId: number;
  employerId: number;
  status: string;
  slug: string;
  skills: string[];
  companyId: number;
  benefits: string[];
  experience: string;
  
  // Adding additional properties needed by components
  companyDescription?: string;
  companySize?: string;
  companyWebsite?: string;
  companyIndustry?: string;
  companyFoundedYear?: string;
  tags?: string[];
  responsibilities?: string[];
  applicationDeadline?: string;
  country?: string;
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

export interface FollowedCompany {
  id: string;
  companyId: number;
  companyName: string;
  companyLogo?: string;
  followedAt: string;
}

export interface CompanyStats {
  followers: number;
  activeJobs: number;
  totalJobs: number;
  views: number;
}
