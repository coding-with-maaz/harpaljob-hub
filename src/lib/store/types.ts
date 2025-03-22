export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  logo?: string;
  postedDate: string;
  categoryId: string;
  employerId: string;
  requirements: string[];
  benefits: string[];
  status: 'active' | 'closed' | 'draft';
  isFeatured: boolean;
  isRemote: boolean;
  experience: string;
  education: string;
  skills: string[];
  applicationsCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  featured: boolean;
  views: number;
  applications: number;
  slug: string;
  companyId: string;
  category?: JobCategory;
  employer?: User;
}

export interface JobResponse {
  success: boolean;
  data: {
    jobs: Job[];
    trending: {
      companies: Array<{ company: string; jobCount: number }>;
      searches: Array<{ title: string; count: number }>;
    };
  };
  pagination: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
  filters: JobFilters;
}

export interface JobCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  jobCount: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'employer' | 'jobseeker' | 'admin';
  companyName?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  query?: string;
  location?: string;
  category?: string;
  employmentType?: string;
  sortBy?: 'relevance' | 'recent' | 'salary-high' | 'salary-low' | 'popular' | 'deadline';
  page?: number;
  limit?: number;
  featured?: boolean;
  remoteOnly?: boolean;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  hasMore: boolean;
}
