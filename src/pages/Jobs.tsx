
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X, Filter, ChevronDown, Briefcase, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { searchJobs, getAllJobs, getJobsByCategory } from '@/lib/jobs';
import { Job } from '@/lib/types';

const Jobs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const initialSearchTerm = queryParams.get('search') || '';
  const initialLocation = queryParams.get('location') || '';
  const initialCategory = queryParams.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [jobTypeFilter, setJobTypeFilter] = useState<Job['type'] | ''>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Filter options
  const jobTypes: Job['type'][] = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const categories: Job['category'][] = ['Technology', 'Design', 'Marketing', 'Sales', 'Customer Service', 'Finance', 'Other'];
  
  // Load jobs based on filters
  useEffect(() => {
    let filteredJobs: Job[] = [];
    
    // Apply search term filter
    if (searchTerm) {
      filteredJobs = searchJobs(searchTerm);
    } else {
      filteredJobs = getAllJobs();
    }
    
    // Apply category filter
    if (categoryFilter) {
      filteredJobs = filteredJobs.filter(job => job.category === categoryFilter);
    }
    
    // Apply job type filter
    if (jobTypeFilter) {
      filteredJobs = filteredJobs.filter(job => job.type === jobTypeFilter);
    }
    
    // Apply location filter
    if (locationFilter) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    setJobs(filteredJobs);
  }, [searchTerm, categoryFilter, jobTypeFilter, locationFilter]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('search', searchTerm);
    if (locationFilter) params.append('location', locationFilter);
    if (categoryFilter) params.append('category', categoryFilter);
    
    navigate({
      pathname: '/jobs',
      search: params.toString()
    }, { replace: true });
  }, [searchTerm, locationFilter, categoryFilter, navigate]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setCategoryFilter('');
    setJobTypeFilter('');
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Job</h1>
              <p className="text-muted-foreground">
                Browse through {jobs.length} job opportunities
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="glass-card rounded-xl p-4 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-job-blue/20 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-job-blue/20 transition-all"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="h-11 px-6 font-medium bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors shadow-sm"
                >
                  Search
                </button>
              </form>
            </div>
            
            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <button 
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center text-sm font-medium mr-4 md:hidden"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Active filters */}
                <div className="flex flex-wrap gap-2">
                  {categoryFilter && (
                    <div className="flex items-center bg-secondary/80 text-secondary-foreground text-xs font-medium rounded-full px-3 py-1">
                      Category: {categoryFilter}
                      <button 
                        onClick={() => setCategoryFilter('')}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {jobTypeFilter && (
                    <div className="flex items-center bg-secondary/80 text-secondary-foreground text-xs font-medium rounded-full px-3 py-1">
                      Type: {jobTypeFilter}
                      <button 
                        onClick={() => setJobTypeFilter('')}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {(categoryFilter || jobTypeFilter) && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-job-blue hover:text-job-indigo"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{jobs.length}</span> results
              </div>
            </div>
            
            {/* Filters panel (mobile) */}
            <div className={`glass-card rounded-xl p-6 mb-8 md:hidden ${isFiltersOpen ? 'block' : 'hidden'}`}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Job Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input 
                          type="radio"
                          name="category"
                          checked={categoryFilter === category}
                          onChange={() => setCategoryFilter(category)}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="radio"
                          name="jobType"
                          checked={jobTypeFilter === type}
                          onChange={() => setJobTypeFilter(type)}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content with filters and jobs list */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar (desktop) */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="glass-card rounded-xl p-6 sticky top-24">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Job Category</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input 
                              type="radio"
                              name="category"
                              checked={categoryFilter === category}
                              onChange={() => setCategoryFilter(category)}
                              className="mr-2"
                            />
                            {category}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Job Type</h3>
                      <div className="space-y-2">
                        {jobTypes.map((type) => (
                          <label key={type} className="flex items-center">
                            <input 
                              type="radio"
                              name="jobType"
                              checked={jobTypeFilter === type}
                              onChange={() => setJobTypeFilter(type)}
                              className="mr-2"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Jobs list */}
              <div className="flex-1">
                {jobs.length > 0 ? (
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 glass-card rounded-xl">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-xl font-medium mb-2">No jobs found</h2>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any jobs matching your criteria. Try adjusting your filters.
                    </p>
                    <button 
                      onClick={clearFilters}
                      className="px-4 py-2 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
