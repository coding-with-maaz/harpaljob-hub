
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import JobCategoriesList from "@/components/JobCategoriesList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import AdBanner from "@/components/ads/AdBanner";
import SEOHead from "@/components/SEOHead";
import { generateJobListingStructuredData } from "@/utils/seo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobs } from "@/lib/jobs";
import { Job } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  X, 
  ChevronDown,
  ChevronRight,
  Star,
  Grid2x2,
  PanelRight
} from "lucide-react";

// Salary formatting function
const formatSalary = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Parse salary strings like "$120,000 - $150,000" into min and max numbers
const parseSalaryRange = (salaryString: string): [number, number] => {
  const matches = salaryString.match(/\$(\d+,*\d*)\s*-\s*\$(\d+,*\d*)/);
  if (matches && matches.length >= 3) {
    const min = parseInt(matches[1].replace(/,/g, ''), 10);
    const max = parseInt(matches[2].replace(/,/g, ''), 10);
    return [min, max];
  }
  return [0, 150000]; // Default range if parsing fails
};

// Structured data for job listings
const jobsStructuredData = generateJobListingStructuredData(
  jobs.map(job => {
    const [salaryMin, salaryMax] = parseSalaryRange(job.salary);
    return {
      title: job.title,
      description: job.description,
      datePosted: job.postedDate,
      validThrough: new Date(new Date(job.postedDate).setMonth(new Date(job.postedDate).getMonth() + 3)).toISOString(),
      employmentType: job.type.toUpperCase(),
      company: job.company,
      companyLogo: job.logo,
      location: job.location,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      currency: "USD",
      salaryUnit: "YEAR"
    }
  })
);

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 150000]);
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter((job) => {
    // Text search (title, company, description, location)
    const searchMatch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Location filter
    const locationMatch = !selectedLocation || job.location === selectedLocation;
    
    // Job type filter
    const jobTypeMatch = !selectedJobType || job.type === selectedJobType;
    
    // Category filter
    const categoryMatch = !selectedCategory || job.category === selectedCategory;
    
    // Salary range filter
    const [jobSalaryMin, jobSalaryMax] = parseSalaryRange(job.salary);
    const salaryMatch = (jobSalaryMin >= salaryRange[0] && jobSalaryMax <= salaryRange[1]);
    
    // Remote filter - check if location contains "Remote"
    const isRemote = job.location.toLowerCase().includes("remote");
    const remoteMatch = !showRemoteOnly || isRemote;
    
    return searchMatch && locationMatch && jobTypeMatch && categoryMatch && salaryMatch && remoteMatch;
  });
  
  // Get unique locations, job types, and categories for filters
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const jobTypes = Array.from(new Set(jobs.map(job => job.type)));
  const categories = Array.from(new Set(jobs.map(job => job.category)));
  
  return (
    <>
      <SEOHead
        title="Find Your Next Career | Job Listings"
        description="Browse thousands of job opportunities across various industries and locations. Filter by job type, location, and salary to find your perfect match."
        keywords="jobs, careers, employment, job search, job listings, remote work, full-time jobs, part-time jobs"
        ogType="website"
        structuredData={jobsStructuredData}
      />
  
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section with search */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Find Your Dream Job Today
              </h1>
              <p className="text-blue-100 text-center max-w-2xl mx-auto mb-8">
                Search through thousands of job listings to find the perfect opportunity for your skills and experience.
              </p>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
                  <div className="flex-grow relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Job title, company, or keywords"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-shrink-0" onClick={() => setShowFilters(!showFilters)}>
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                    <Button className="flex-shrink-0">
                      Search Jobs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Job Categories Section */}
          <section className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Browse by Category</h2>
                <Link to="/job-categories" className="text-job-blue hover:underline flex items-center gap-1 text-sm font-medium">
                  View all categories
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <JobCategoriesList layout="pills" limit={8} />
            </div>
          </section>

          {/* Google Ad Banner in header */}
          <div className="container mx-auto px-4 py-4">
            <AdBanner
              id="jobs-header-ad"
              position="header"
              size="responsive"
              type="google"
              googleAdSlot="jobs_header_12345"
            />
          </div>
          
          {/* Main content */}
          <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar for desktop */}
              <aside className={`lg:w-1/4 rounded-lg border border-gray-200 h-fit ${showFilters || !isMobile ? 'block' : 'hidden'}`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold">Filters</h2>
                  {isMobile && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium mb-3">Location</h3>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Location</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium mb-3">Job Type</h3>
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Job Type</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium mb-3">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Category</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium mb-4">Salary Range</h3>
                  <Slider
                    value={salaryRange}
                    min={0}
                    max={200000}
                    step={10000}
                    onValueChange={setSalaryRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatSalary(salaryRange[0])}</span>
                    <span>{formatSalary(salaryRange[1])}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remote-only" 
                      checked={showRemoteOnly}
                      onCheckedChange={(checked) => setShowRemoteOnly(checked as boolean)}
                    />
                    <label
                      htmlFor="remote-only"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remote Only
                    </label>
                  </div>
                </div>
                
                {/* Sidebar Ad */}
                <div className="p-4 mt-6">
                  <AdBanner
                    id="filter-sidebar-ad"
                    position="sidebar"
                    size="medium"
                  />
                </div>
              </aside>

              {/* Job Listings */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-6">
                  {filteredJobs.map((job: Job, index: number) => (
                    <React.Fragment key={job.id}>
                      <JobCard job={job} />
                      
                      {/* Insert ad after every 3 job listings */}
                      {(index + 1) % 3 === 0 && index < filteredJobs.length - 1 && (
                        <AdBanner
                          id={`inline-ad-${Math.floor(index / 3)}`}
                          position="inline"
                          size="responsive"
                          type={index % 6 === 0 ? "google" : "internal"}
                          googleAdSlot={`jobs_inline_${Math.floor(index / 3)}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                  
                  {filteredJobs.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-2">No jobs match your search criteria</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedLocation("");
                          setSelectedJobType("");
                          setSelectedCategory("");
                          setSalaryRange([0, 150000]);
                          setShowRemoteOnly(false);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer Ad Banner */}
          <div className="container mx-auto px-4 py-8">
            <AdBanner
              id="jobs-footer-ad"
              position="footer"
              size="responsive"
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Jobs;
