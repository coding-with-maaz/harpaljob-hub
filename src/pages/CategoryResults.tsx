
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import SEOHead from "@/components/SEOHead";
import AdBanner from "@/components/ads/AdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { generateJobListingStructuredData } from "@/utils/seo";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  X, 
  MapPin, 
  Briefcase, 
  Code, 
  LineChart, 
  Palette, 
  GraduationCap, 
  HeartPulse, 
  Building2, 
  BarChart3, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Coffee,
  LayoutGrid,
  List
} from "lucide-react";
import { jobs, getJobsByCategory } from "@/lib/jobs";
import { Job } from "@/lib/types";

// Category metadata with icons and colors
const categoryMetadata: Record<string, { 
  name: string; 
  icon: React.ElementType; 
  color: string;
  description: string;
  breadcrumb: string;
}> = {
  "technology": {
    name: "Technology", 
    icon: Code, 
    color: "bg-blue-100 text-blue-700",
    description: "Find tech jobs in software development, IT support, cybersecurity, and more.",
    breadcrumb: "Tech Jobs"
  },
  "design": {
    name: "Design", 
    icon: Palette, 
    color: "bg-purple-100 text-purple-700",
    description: "Browse creative design positions including UX/UI, graphic design, and product design.",
    breadcrumb: "Design Jobs"
  },
  "marketing": {
    name: "Marketing", 
    icon: LineChart, 
    color: "bg-green-100 text-green-700",
    description: "Discover marketing roles in digital marketing, content creation, SEO, and social media.",
    breadcrumb: "Marketing Jobs"
  },
  "business": {
    name: "Business", 
    icon: Briefcase, 
    color: "bg-amber-100 text-amber-700",
    description: "Explore business opportunities in management, operations, and administration.",
    breadcrumb: "Business Jobs"
  },
  "education": {
    name: "Education", 
    icon: GraduationCap, 
    color: "bg-cyan-100 text-cyan-700",
    description: "Find teaching and education roles at schools, universities, and educational institutions.",
    breadcrumb: "Education Jobs"
  },
  "healthcare": {
    name: "Healthcare", 
    icon: HeartPulse, 
    color: "bg-red-100 text-red-700",
    description: "Browse healthcare positions including nursing, medical professionals, and health services.",
    breadcrumb: "Healthcare Jobs"
  },
  "finance": {
    name: "Finance", 
    icon: BarChart3, 
    color: "bg-emerald-100 text-emerald-700",
    description: "Discover finance jobs in accounting, banking, financial analysis, and investment.",
    breadcrumb: "Finance Jobs"
  },
  "government": {
    name: "Government", 
    icon: Building2, 
    color: "bg-slate-100 text-slate-700",
    description: "Find positions in public service, government agencies, and civil service.",
    breadcrumb: "Government Jobs"
  },
  "legal": {
    name: "Legal", 
    icon: ShieldCheck, 
    color: "bg-indigo-100 text-indigo-700",
    description: "Browse legal roles including paralegals, attorneys, and compliance specialists.",
    breadcrumb: "Legal Jobs"
  },
  "transportation": {
    name: "Transportation", 
    icon: Truck, 
    color: "bg-orange-100 text-orange-700",
    description: "Explore jobs in logistics, delivery, transportation, and supply chain.",
    breadcrumb: "Transportation Jobs"
  },
  "manufacturing": {
    name: "Manufacturing", 
    icon: Wrench, 
    color: "bg-zinc-100 text-zinc-700",
    description: "Find roles in production, assembly, and manufacturing operations.",
    breadcrumb: "Manufacturing Jobs"
  },
  "hospitality": {
    name: "Hospitality", 
    icon: Coffee, 
    color: "bg-rose-100 text-rose-700",
    description: "Discover jobs in hotels, restaurants, tourism, and the service industry.",
    breadcrumb: "Hospitality Jobs"
  }
};

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

const CategoryResults = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const isMobile = useIsMobile();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 150000]);
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isLoading, setIsLoading] = useState(true);
  
  // Get category metadata or set fallback values
  const categoryMeta = categoryId && categoryMetadata[categoryId] 
    ? categoryMetadata[categoryId] 
    : { 
        name: categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "All Categories", 
        icon: Briefcase, 
        color: "bg-gray-100 text-gray-700",
        description: "Browse all available job listings.",
        breadcrumb: "Jobs"
      };
  
  // Set title and SEO metadata
  const pageTitle = `${categoryMeta.name} Jobs | Find Your Next Career`;
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get all jobs
  const allJobs = jobs;
  
  // Filter jobs based on category and other filters
  const filteredJobs = allJobs.filter((job) => {
    // Category filter - basic fuzzy match
    const categoryMatch = !categoryId || 
      job.category.toLowerCase() === categoryId.toLowerCase() ||
      job.category.toLowerCase().includes(categoryId.toLowerCase()) ||
      categoryId.toLowerCase().includes(job.category.toLowerCase());
    
    // Text search (title, company, description)
    const searchMatch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Location filter
    const locationMatch = !selectedLocation || job.location === selectedLocation;
    
    // Job type filter
    const jobTypeMatch = !selectedJobType || job.type === selectedJobType;
    
    // Salary range filter
    const [jobSalaryMin, jobSalaryMax] = parseSalaryRange(job.salary);
    const salaryMatch = (jobSalaryMin >= salaryRange[0] && jobSalaryMax <= salaryRange[1]);
    
    // Remote filter - check if location contains "Remote"
    const isRemote = job.location.toLowerCase().includes("remote");
    const remoteMatch = !showRemoteOnly || isRemote;
    
    return categoryMatch && searchMatch && locationMatch && jobTypeMatch && salaryMatch && remoteMatch;
  });
  
  // Get unique locations and job types for filters
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const jobTypes = Array.from(new Set(jobs.map(job => job.type)));
  
  // Create structured data for job listings
  const jobsStructuredData = generateJobListingStructuredData(
    filteredJobs.map(job => {
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

  // Category icon component
  const CategoryIcon = categoryMeta.icon;
  
  return (
    <>
      <SEOHead
        title={pageTitle}
        description={categoryMeta.description}
        keywords={`${categoryMeta.name.toLowerCase()} jobs, ${categoryMeta.name.toLowerCase()} careers, ${categoryMeta.name.toLowerCase()} positions, job search, hiring, employment`}
        ogType="website"
        structuredData={jobsStructuredData}
      />
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Category Header */}
          <section className={`${categoryMeta.color.split(' ')[0].replace('100', '500')} bg-opacity-10 py-12`}>
            <div className="container mx-auto px-4">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm mb-6 text-muted-foreground">
                <Link to="/jobs" className="hover:text-foreground transition-colors">
                  Jobs
                </Link>
                <span className="mx-2">/</span>
                <Link to="/job-categories" className="hover:text-foreground transition-colors">
                  Categories
                </Link>
                <span className="mx-2">/</span>
                <span className="font-medium text-foreground">{categoryMeta.breadcrumb}</span>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-lg ${categoryMeta.color} flex items-center justify-center`}>
                  <CategoryIcon className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{categoryMeta.name} Jobs</h1>
                  <p className="text-muted-foreground max-w-2xl">{categoryMeta.description}</p>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col md:flex-row gap-2 max-w-4xl">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search job titles or keywords"
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
          </section>
          
          {/* Main content */}
          <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar */}
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
                          {type.charAt(0).toUpperCase() + type.slice(1)}
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
                    id="category-sidebar-ad"
                    position="sidebar"
                    size="medium"
                  />
                </div>
              </aside>

              {/* Job Listings */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {isLoading ? (
                      <Skeleton className="h-6 w-40" />
                    ) : (
                      `${filteredJobs.length} Jobs Found`
                    )}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex border rounded overflow-hidden">
                      <Button 
                        variant={viewMode === "list" ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-none h-9"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={viewMode === "grid" ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-none h-9"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </div>
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
                </div>
                
                {isLoading ? (
                  // Loading skeletons
                  <div className="space-y-6">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                        <div className="flex gap-4">
                          <Skeleton className="h-12 w-12 rounded-md" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-32 mb-2" />
                            <Skeleton className="h-6 w-60 mb-3" />
                            <Skeleton className="h-4 w-full mb-3" />
                            <div className="flex gap-2">
                              <Skeleton className="h-5 w-24" />
                              <Skeleton className="h-5 w-20" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {viewMode === "list" ? (
                      // List view
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
                      </div>
                    ) : (
                      // Grid view
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJobs.map((job: Job, index: number) => (
                          <React.Fragment key={job.id}>
                            <JobCard job={job} featured={true} />
                            
                            {/* Insert ad after every 4 job listings */}
                            {(index + 1) % 4 === 0 && index < filteredJobs.length - 1 && (
                              <div className="md:col-span-2">
                                <AdBanner
                                  id={`inline-grid-ad-${Math.floor(index / 4)}`}
                                  position="inline"
                                  size="responsive"
                                  type={index % 8 === 0 ? "google" : "internal"}
                                  googleAdSlot={`jobs_inline_${Math.floor(index / 4)}`}
                                />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                    
                    {filteredJobs.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-2">No jobs match your search criteria</p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedLocation("");
                            setSelectedJobType("");
                            setSalaryRange([0, 150000]);
                            setShowRemoteOnly(false);
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
          
          {/* Related Categories */}
          <section className="bg-gray-50 py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Related Categories</h2>
              <div className="flex flex-wrap gap-3">
                {Object.entries(categoryMetadata)
                  .filter(([id]) => id !== categoryId)
                  .slice(0, 6)
                  .map(([id, data]) => (
                    <Link 
                      key={id} 
                      to={`/category/${id}`}
                      className={`px-4 py-2 rounded-full ${data.color} font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      <data.icon className="h-4 w-4" />
                      {data.name}
                    </Link>
                  ))}
              </div>
            </div>
          </section>
          
          {/* Ad Banner */}
          <div className="container mx-auto px-4 py-8">
            <AdBanner
              id="category-footer-ad"
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

export default CategoryResults;
