import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  ArrowRight,
  Bookmark,
  Share2,
  ChevronDown,
  ArrowUpDown,
  Clock,
  Building2,
  SlidersHorizontal,
  X
} from "lucide-react";
import { useGetJobsQuery, useGetCategoriesQuery } from "@/lib/store/api";
import type { JobFilters } from "@/lib/store/types";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<JobFilters>({
    query: searchParams.get('search') || "",
    location: searchParams.get('location') || "",
    category: searchParams.get('category') || "",
    employmentType: searchParams.get('type') || "",
    sortBy: searchParams.get('sort') || "relevance",
    page: Number(searchParams.get('page')) || 1,
    limit: 10
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch jobs and categories using RTK Query
  const { data: jobsData, isLoading, error } = useGetJobsQuery(filters);
  const { data: categoriesData } = useGetCategoriesQuery();
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query) params.set('search', filters.query);
    if (filters.location) params.set('location', filters.location);
    if (filters.category) params.set('category', filters.category);
    if (filters.employmentType) params.set('type', filters.employmentType);
    if (filters.sortBy !== 'relevance') params.set('sort', filters.sortBy);
    if (filters.page > 1) params.set('page', filters.page.toString());
    
    setSearchParams(params);
  }, [filters, setSearchParams]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };
  
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      page: 1
    }));
  };
  
  return (
    <>
      <Helmet>
        <title>Find Jobs | HarpalJobs</title>
        <meta 
          name="description" 
          content="Search and find the perfect job opportunity from thousands of listings across all industries and locations."
        />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-28 pb-16 bg-gradient-to-b from-job-blue/10 to-transparent">
            <div className="container px-4 mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Find Your <span className="text-job-blue">Dream Job</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Search through thousands of job listings to find the perfect opportunity for your career growth.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-slate-200">
                <div className="p-4 md:p-6">
                  <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input 
                        type="text" 
                        placeholder="Job title, company, or keywords" 
                        className="pl-10"
                        value={filters.query}
                        onChange={(e) => handleFilterChange('query', e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full md:w-auto gap-2">
                      Search Jobs
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                  
                  <div className={`${showFilters ? 'block' : 'hidden'} mt-4 pt-4 border-t`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input 
                            type="text" 
                            placeholder="City or remote" 
                            className="pl-10"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={filters.category}
                          onValueChange={(value) => handleFilterChange('category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesData?.data.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Employment Type</label>
                        <Select
                          value={filters.employmentType}
                          onValueChange={(value) => handleFilterChange('employmentType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleFilters}
                      className="text-muted-foreground"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <Select
                        value={filters.sortBy}
                        onValueChange={(value) => handleFilterChange('sortBy', value as JobFilters['sortBy'])}
                      >
                        <SelectTrigger className="w-[160px] h-8 text-sm">
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="salary-high">Highest Salary</SelectItem>
                          <SelectItem value="salary-low">Lowest Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Main Content */}
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                {/* Jobs List */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {jobsData?.pagination.total || 0} Jobs Found
                    </h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Updated 10 minutes ago</span>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-blue mx-auto"></div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 bg-red-50 rounded-xl">
                      <h3 className="text-xl font-semibold mb-2 text-red-600">Error Loading Jobs</h3>
                      <p className="text-red-600 mb-6">
                        There was an error loading the jobs. Please try again later.
                      </p>
                    </div>
                  ) : jobsData?.data.jobs.length ? (
                    <div className="space-y-4">
                      {jobsData.data.jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-xl">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find any jobs matching your search criteria.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setFilters({
                          query: "",
                          location: "",
                          category: "",
                          employmentType: "",
                          sortBy: "relevance",
                          page: 1,
                          limit: 10
                        })}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                  
                  {jobsData?.pagination.pages > 1 && (
                    <div className="flex justify-center mt-8">
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: jobsData.pagination.pages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={filters.page === page ? "default" : "outline"}
                          className="mx-1"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button 
                        variant="outline" 
                        className="ml-2"
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === jobsData.pagination.pages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                  <Tabs defaultValue="trending">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="trending">Trending</TabsTrigger>
                      <TabsTrigger value="categories">Categories</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="trending" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Building2 className="h-4 w-4 mr-2" />
                            Top Companies Hiring
                          </h3>
                          <ul className="space-y-2 text-sm">
                            {jobsData?.data.trending.companies.map((company) => (
                              <li key={company.company} className="flex items-center justify-between">
                                <span>{company.company}</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                  {company.jobCount} jobs
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Popular Job Searches
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {jobsData?.data.trending.searches.map((search) => (
                              <Button 
                                key={search.title}
                                variant="outline" 
                                size="sm" 
                                className="rounded-full text-xs"
                                onClick={() => handleFilterChange('query', search.title)}
                              >
                                {search.title}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="categories" className="pt-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Job Categories</h3>
                        <ul className="space-y-2 text-sm">
                          {categoriesData?.data.map((category) => (
                            <li key={category.id}>
                              <Link 
                                to={`/category/${category.id}`} 
                                className="flex items-center justify-between hover:text-job-blue transition-colors"
                              >
                                <span>{category.name}</span>
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-3 border-t">
                          <Link 
                            to="/job-categories" 
                            className="text-sm text-job-blue flex items-center hover:underline"
                          >
                            <span>View all categories</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-job-blue/10 p-4 rounded-lg border border-job-blue/20">
                        <h3 className="font-medium mb-2">Can't find what you need?</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Create a job alert and we'll notify you when new jobs match your criteria.
                        </p>
                        <Button size="sm" className="w-full">
                          Create Job Alert
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="bg-gradient-to-br from-job-blue to-job-indigo text-white p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-3">Mobile Job Search</h3>
                    <p className="text-sm mb-4 text-white/90">
                      Take your job search on the go with our mobile app. Apply to jobs, track applications, and more.
                    </p>
                    <Link to="/mobile-app">
                      <Button variant="secondary" size="sm" className="w-full">
                        Get the App
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Jobs;
