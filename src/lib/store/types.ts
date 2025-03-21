export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  country: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  categoryId: string;
  categoryName: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  views: number;
  postedDate: string;
  deadline: string;
  employerId: string;
  employer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
  };
  jobCategory?: {
    id: string;
    name: string;
    icon: string;
  };
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
  sortBy?: 'relevance' | 'recent' | 'salary-high' | 'salary-low';
  page?: number;
  limit?: number;
  featured?: boolean;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  hasMore: boolean;
} 