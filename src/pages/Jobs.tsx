import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X, Filter, ChevronDown, Briefcase, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { searchJobs, getAllJobs, getJobsByCategory } from '@/lib/jobs';
import { Job } from '@/lib/types';
import AdBanner from "@/components/ads/AdBanner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const formatSalary = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

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
  
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [salaryRange, setSalaryRange] = useState([30000, 150000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
  const jobTypes: Job['type'][] = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const categories: Job['category'][] = ['Technology', 'Design', 'Marketing', 'Sales', 'Customer Service', 'Finance', 'Other'];
  
  useEffect(() => {
    let filteredJobs: Job[] = [];
    
    if (searchTerm) {
      filteredJobs = searchJobs(searchTerm);
    } else {
      filteredJobs = getAllJobs();
    }
    
    if (categoryFilter) {
      filteredJobs = filteredJobs.filter(job => job.category === categoryFilter);
    }
    
    if (jobTypeFilter) {
      filteredJobs = filteredJobs.filter(job => job.type === jobTypeFilter);
    }
    
    if (locationFilter) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    setJobs(filteredJobs);
    setFilteredJobs(filteredJobs);
    setIsLoading(false);
  }, [searchTerm, categoryFilter, jobTypeFilter, locationFilter]);
  
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
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setCategoryFilter('');
    setJobTypeFilter('');
    setSelectedLocation('');
    setSelectedJobType('');
    setSelectedExperience('');
    setSalaryRange([30000, 150000]);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Find Jobs | HarpalJobs</title>
        <meta name="description" content="Browse thousands of job opportunities across various industries and locations." />
        <meta name="keywords" content="jobs, careers, job search, employment, remote jobs, tech jobs, developer jobs, work from home" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your Next Opportunity</h1>
          <p className="text-slate-600 max-w-3xl">Browse through thousands of job listings tailored to your skills and preferences.</p>
        </div>
        
        <AdBanner id="jobs-top-banner" position="header" className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filter Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Job title, skill, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="san-francisco">San Francisco</SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="berlin">Berlin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select
                    value={selectedJobType}
                    onValueChange={setSelectedJobType}
                  >
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="All job types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All job types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select
                    value={selectedExperience}
                    onValueChange={setSelectedExperience}
                  >
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All levels</SelectItem>
                      <SelectItem value="entry">Entry level</SelectItem>
                      <SelectItem value="mid">Mid level</SelectItem>
                      <SelectItem value="senior">Senior level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="salary-range">Salary Range</Label>
                    <span className="text-sm text-slate-500">{formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}</span>
                  </div>
                  <Slider
                    id="salary-range"
                    defaultValue={[30000, 150000]}
                    min={0}
                    max={250000}
                    step={5000}
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                  />
                </div>
                
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
            
            <AdBanner id="jobs-sidebar-ad" position="sidebar" size="small" />
            
            <AdBanner id="google-sidebar-ad" type="google" size="medium" googleAdSlot="3456789012" />
          </div>
          
          <div className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <p className="text-sm text-slate-500">Showing <span className="font-medium">{filteredJobs.length}</span> jobs</p>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="text-sm">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date-desc">Newest first</SelectItem>
                    <SelectItem value="date-asc">Oldest first</SelectItem>
                    <SelectItem value="salary-desc">Highest salary</SelectItem>
                    <SelectItem value="salary-asc">Lowest salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <div className="flex flex-col space-y-3 animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                      <div className="flex space-x-2">
                        <div className="h-2 bg-slate-200 rounded w-16"></div>
                        <div className="h-2 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No jobs found matching your criteria.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <AdBanner id="google-top-results" type="google" size="large" googleAdSlot="2345678901" className="mb-4" />
                  
                  {filteredJobs.map((job, index) => (
                    <React.Fragment key={job.id}>
                      <JobCard job={job} />
                      
                      {(index + 1) % 3 === 0 && index < filteredJobs.length - 1 && (
                        <AdBanner id={`inline-ad-${index}`} position="inline" size="medium" />
                      )}
                      
                      {(index + 1) % 5 === 0 && index < filteredJobs.length - 1 && (
                        <AdBanner id={`google-inline-ad-${index}`} type="google" size="medium" googleAdSlot={`${1234567890 + index}`} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
            
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <AdBanner id="jobs-bottom-banner" position="footer" className="mt-8" />
        
        <AdBanner id="google-bottom-ad" type="google" size="large" googleAdSlot="9876543210" className="mt-4" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
