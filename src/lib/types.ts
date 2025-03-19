
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
}
