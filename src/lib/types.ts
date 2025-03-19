
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  logo: string;
  category: 'Technology' | 'Design' | 'Marketing' | 'Sales' | 'Customer Service' | 'Finance' | 'Other';
  featured?: boolean;
  tags?: string[];
  applicationUrl?: string;
  companyDescription?: string;
  benefits?: string[];
  companyWebsite?: string;
  companySize?: string;
  companyIndustry?: string;
  companyFoundedYear?: number;
  applicationDeadline?: string;
  socialShareLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
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
