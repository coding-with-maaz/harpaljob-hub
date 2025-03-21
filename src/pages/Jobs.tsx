
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { jobs } from "@/lib/jobs";
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
  Building2
} from "lucide-react";

interface SearchFilters {
  query: string;
  location: string;
  category: string;
  employmentType: string;
  sortBy: string;
}

const Jobs = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    location: "",
    category: "",
    employmentType: "",
    sortBy: "relevance"
  });
  
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    if (filters.query && !job.title.toLowerCase().includes(filters.query.toLowerCase()) && 
        !job.company.toLowerCase().includes(filters.query.toLowerCase()) &&
        !job.description.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }
    
    if (filters.location && job.location !== filters.location) {
      return false;
    }
    
    if (filters.category && job.category !== filters.category) {
      return false;
    }
    
    if (filters.employmentType && job.employmentType !== filters.employmentType) {
      return false;
    }
    
    return true;
  });
  
  // Sort jobs based on selected sort option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (filters.sortBy === "recent") {
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    } else if (filters.sortBy === "salary-high") {
      return (b.salaryMax || 0) - (a.salaryMax || 0);
    } else if (filters.sortBy === "salary-low") {
      return (a.salaryMin || 0) - (b.salaryMin || 0);
    }
    
    // Default: relevance (no specific sorting)
    return 0;
  });
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
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
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
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
                    <Button className="w-full md:w-auto gap-2">
                      Search Jobs
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className={`${filtersVisible ? 'block' : 'hidden'} mt-4 pt-4 border-t`}>
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
                            <SelectItem value="">All Categories</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
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
                            <SelectItem value="">All Types</SelectItem>
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
                      {filtersVisible ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <Select
                        value={filters.sortBy}
                        onValueChange={(value) => handleFilterChange('sortBy', value)}
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
                      {sortedJobs.length} Jobs Found
                    </h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Updated 10 minutes ago</span>
                    </div>
                  </div>
                  
                  {sortedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {sortedJobs.map((job) => (
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
                          sortBy: "relevance"
                        })}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                  
                  {sortedJobs.length > 0 && (
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="mr-2">Previous</Button>
                      <Button variant="outline" className="mx-1">1</Button>
                      <Button className="mx-1">2</Button>
                      <Button variant="outline" className="mx-1">3</Button>
                      <div className="mx-1 flex items-center">...</div>
                      <Button variant="outline" className="mx-1">10</Button>
                      <Button variant="outline" className="ml-2">Next</Button>
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
                            <li className="flex items-center justify-between">
                              <span>TechCorp</span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">24 jobs</span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span>DesignHub</span>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">18 jobs</span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span>Marketing Pro</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">15 jobs</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Popular Job Searches
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="rounded-full text-xs">
                              Remote Jobs
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full text-xs">
                              Software Engineer
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full text-xs">
                              UX Designer
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full text-xs">
                              Marketing Manager
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full text-xs">
                              Data Analyst
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="categories" className="pt-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Job Categories</h3>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Link to="/category/technology" className="flex items-center justify-between hover:text-job-blue transition-colors">
                              <span>Technology</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/category/design" className="flex items-center justify-between hover:text-job-blue transition-colors">
                              <span>Design</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/category/marketing" className="flex items-center justify-between hover:text-job-blue transition-colors">
                              <span>Marketing</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/category/business" className="flex items-center justify-between hover:text-job-blue transition-colors">
                              <span>Business</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/category/healthcare" className="flex items-center justify-between hover:text-job-blue transition-colors">
                              <span>Healthcare</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </li>
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
